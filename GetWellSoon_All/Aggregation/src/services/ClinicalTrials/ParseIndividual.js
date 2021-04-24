const axios = require('axios');
const url = require("url");
const cheerio = require("cheerio");
class ParseIndividual {

  constructor(props) {
  }
  
  async execute(urlgiven) {
    const { data: html } = await axios(urlgiven);

    // set up variables and json
    let $ = cheerio.load(html);
    let id = "NCT" + url.parse(urlgiven, true).pathname.replace(/\D/g, "").substring(1, 9);
    let gender;
    let sponsor;
    let participants;
    let minage;
    let maxage;
    let purpose;
    let type;
    let intervention;
    let name;
    let phase;
    let conditions;
    let locationList = [];
    let interventionList = [];
    let conditionList = [];
    let locationNameList = [];
    let locationZipList = [];
    let inclusionCriteria = [];
    let exclusionCriteria = [];
    let trialurl = url.parse(urlgiven, true).href;
    let json = {
        name: "", id: "", purpose: "", sponsor: "", phase: "", interventionList: [], gender: "", minage: "", maxage: "", participants: "", type: "", trialurl: "", conditionList: [], locationList: []
        , inclusionCriteria: [], exclusionCriteria: []
    };

    // function to navigate to #sponsor element on page and get elements from its children
    $("#sponsor").filter(function () {

        let data = $(this);

        sponsor = data.text().trim();

        json.sponsor = sponsor;

    });

    // functions to navigate to #tab-body element on page and get elements from its children
    $("#tab-body").filter(function () {

        let data = $(this);

        let common = data.children().children().eq(0).children().eq(4);

        participants = common.children().eq(2).children().eq(1).children().eq(1).text().replace(/\D/g, "");
        type = common.children().eq(2).children().eq(1).children().eq(0).text();

        for (let i = 0; i < common.find("tr").length; i++) {
            if (common.children().eq(2).children().eq(i).children().eq(0).text().trim() === "Primary Purpose:") {
                purpose = common.children().eq(2).children().eq(i).children().eq(1).text().trim();
                break;
            } else {
                purpose = "";
            }
        }

        for (let i = 0; i < common.find("tr").length; i++) {
            if (common.children().eq(2).children().eq(i).children().eq(0).text().trim() === "Official Title:") {
                name = common.children().eq(2).children().eq(i).children().eq(1).text().trim();
                break;
            } else {
                name = "";
            }
        }

        json.type = type;
        json.participants = participants;
        json.purpose = purpose;
        json.name = name;
    });

    $("#tab-body").filter(function () {

        let data = $(this);

        let common = data.children().children().eq(8).children().eq(5).children().eq(0).children();

        gender = common.eq(2).children().eq(1).children().eq(1).text();

        if (gender === "Female") {
            gender = "F";
        } else if (gender === "Male") {
            gender = "M";
        } else {
            gender = "B";
        }

        if (common.eq(2).children().eq(0).children().eq(1).text().substring(0, 5) === "up to") {
            minage = 0;
            maxage = common.eq(2).children().eq(0).children().eq(1).text().replace(/\D/g, "");
        }

        let age = common.eq(2).children().eq(0).children().eq(1).text().replace(/\D/g, "");

        if (age.length >= 4) {
            minage = parseInt(age.substring(0, 2), 10);
            maxage = parseInt(age.substring(2), 10);
        } else if (age.length === 3) {

            minage = parseInt(age.substring(0, 1), 10);
            maxage = parseInt(age.substring(1, 3), 10);

        }
        else {

            minage = parseInt(age.substring(0, 2), 10);
            maxage = parseInt("125'", 10);
        }

        let criteriaCommon = data.children().children().eq(8).children().eq(5).children();
        let j;
        let index = 0;

        for (j = 0; j < criteriaCommon.length; j++) {

            if (criteriaCommon.eq(j).text() === "Criteria") {
                while (index < criteriaCommon.eq(j + 1).children().eq(1).children().length) {
                    inclusionCriteria.push(criteriaCommon.eq(j + 1).children().eq(1).children().eq(index).text());
                    index++;
                }
                index = 0;
                while (index < criteriaCommon.eq(j + 1).children().eq(3).children().length) {
                    exclusionCriteria.push(criteriaCommon.eq(j + 1).children().eq(3).children().eq(index).text());
                    index++;
                }
            }

        }

        json.inclusionCriteria = inclusionCriteria;
        json.exclusionCriteria = exclusionCriteria;
        json.gender = gender;
        json.minage = minage;
        json.maxage = maxage;

    });

    // function to navigate to .ct-data_table element on page and get elements from its children
    $(".ct-data_table").filter(function () {

        let data = $(this);
        let j;

        if (data.css("margin") === "auto") {

            if (data.find("tbody").children().eq(1).children().eq(0).children().length === 1) {

                conditions = data.find("tbody").children().eq(1).children().eq(0).children().text().replace(",", "|");

                for (j = 0; j < conditions.length - 1; j++) {
                    if (conditions.substring(j, j + 1) === "|") {
                        conditionList.push(conditions.substring(0, j));
                        conditions = conditions.substring(j + 1);
                    }
                }
                conditionList.push(conditions);
            }

            else {
                for (j = 0; j < data.find("tbody").children().eq(1).children().eq(0).children().length; j++) {
                    conditions = data.find("tbody").children().eq(1).children().eq(0).children().eq(j).text();
                    conditionList.push(conditions);
                }
            }
        }

        conditionList.push(conditions);


        conditionList = [... new Set(conditionList)];

        for (j = 0; j < conditionList.length; j++) {
            if (conditionList[j] === "") {
                conditionList.splice(j, 1);
            }
        }

        if (data.attr("border") === 1) {
            for (j = 0; j < data.find("tbody").children().eq(1).children().eq(0).children().length; j++) {
                intervention = data.find("tbody").children().eq(1).children().eq(1).children().eq(j).text();
                interventionList.push(intervention);
            }
        }

        json.conditionList = conditionList;
        json.interventionList = interventionList;

    });

    let count = 0;

    // function to navigate to td with header = locName element on page and get elements from its children
    $("td[headers='locName']").filter(function () {

        let data = $(this);

        //location["locationName"] = data.text();

        locationNameList.push(data.text());
        locationNameList = [... new Set(locationNameList)];

        let name = locationNameList[count];
        let location = {};
        location["name"] = name;
        locationList.push(location);
        count++;

        //json.locationNameList = locationNameList;

    });

    // function to navigate to td with colspan = 2 and style = white-space: nowrap element on page and get elements from its children
    $("td[style='padding-left:4em;white-space:nowrap;']").filter(function () {

        let data = $(this);

        //location["locationName"] = data.text();

        let l;
        let reverse = data.text().split("").reverse().join("");

        for (l = 0; l < reverse.length; l++) {
            if (reverse.substring(l, l + 1) === ",") {
                let zip = reverse.substring(0, l);
                zip = zip.split("").reverse().join("");
                locationZipList.push(zip.trim());
                break;
            }
        }
        locationZipList = [... new Set(locationZipList)];

        let counter = 0;

        for (const locationZip of locationZipList) {
            let location = locationList[counter];
            location["zip"] = locationZip;
            counter++;
        }

        //json.locationZipList = locationZipList;

    });

    // function to navigate to .ct-data_table element on page and get elements from its children
    $(".ct-data_table").filter(function () {

        let data = $(this);

        if (data.css("margin") === "auto") {
            phase = data.find("tbody").children().eq(1).children().eq(2).children().text().replace(/\D/g, "");
            if (phase === "") {
                phase = 0;
            }
        }

        json.phase = phase;

    });

    json.id = id;
    json.trialurl = trialurl;
    json.locationList = locationList;

    return json;
  }
}

module.exports = ParseIndividual;
