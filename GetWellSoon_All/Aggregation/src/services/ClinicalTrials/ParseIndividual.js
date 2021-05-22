const PuppeteerHelper = require('../../helpers/PuppeteerHelper');
const { backendAPI } = require('../../utils/api');

class ParseIndividual extends PuppeteerHelper {
  constructor(props) {
    super();
  }
  
  async execute(url) {
    const page = await this.getNewPage(); // pass false as an argument if you required to debug 
    await page.goto(url, { timeout: 60000 });

    try {
      let json = {};
      const i = 1;
      let filter = $("#tab-body");
      let rows = filter.children().eq(0).children().children().children();

      while (i <= 55) {
        let tempField = rows.eq(i).children().eq(0).text().trim();
        let tempValue = rows.eq(i).children().eq(1).text().trim();;

        if (tempField.contains("Submitted Date") && tempField.contains("First")) {
          json.first_posted = tempValue;
        }

        if (tempField.contains("Posted Date") && tempField.contains("Last Update")) {
          json.last_updated = tempValue;
        }

        if (tempField.contains("Study Start Date")) {
          json.study_start = tempValue;
        }

        if (tempField.contains("Primary Completion")) {
          json.study_completion = tempValue;
        }

        if (tempField.contains("Original Primary Outcome")) {
          json.primary_outcome = tempValue;
        }

        if (tempField.contains("Original Secondary Outcome")) {
          json.secondary_outcome = tempValue;
        }

        if (tempField.contains("Brief Title")) {
          json.brief_title = tempValue;
        }

        if (tempField.contains("Official Title")) {
          json.official_title = tempValue;
        }

        if (tempField.contains("Summary")) {
          json.summary = tempValue;
        }

        if (tempField.contains("Description")) {
          json.description = tempValue;
        }

        if (tempField.contains("Study Type")) {
          json.study_type = tempValue;
        }

        if (tempField.contains("Study Phase")) {
          json.study_phase = tempValue;
        }

        if (tempField.contains("Study Design")) {
          json.study_design = tempValue;
        }

        if (tempField.contains("Condition")) {
          const conditionSize = rows.eq(i).children().eq(1).children().children().length;

          if (conditionSize != 0) {
            const localConditions = [];
            for (const a = 0; a < conditionSize; a++) {
              localConditions[a] = rows.eq(i).children().eq(1).children().children().eq(a).text().trim();
            }
          }
          json.conditions = localConditions;
        }

        if (tempField.contains("Intervention")) {
          const interventionSize = rows.eq(i).children().eq(1).children().children().length;

          if (interventionSize != 0) {
            const localInterventions = [];
            for (const a = 0; a < interventionSize; a++) {
              localInterventions[a] = rows.eq(i).children().eq(1).children().children().eq(a).text().trim();
            }
          }
          json.interventions = localInterventions;
        }

        if (tempField.contains("Publication")) {
          const publicationSize = rows.eq(i).children().eq(1).children().children().length;

          if (publicationSize != 0) {
            const localPublications = [];
            for (const a = 0; a < publicationSize; a++) {
              localPublications[a] = rows.eq(i).children().eq(1).children().children().eq(a).text().trim();
            }
          }
          json.publications = localPublications;
        }

        if (tempField.contains("Status")) {
          json.status = tempValue;
        }

        if (tempField.contains("Enrollment")) {
          json.enrollment = ParseInt(rows.eq(i).children().eq(1).text().trim());
        }

        if (tempField.contains("Eligibility Criteria")) {
          const inclusionSize = rows.eq(i).children().eq(1).children().eq(1).children().length;
          const exclusionSize = rows.eq(i).children().eq(1).children().eq(3).children().length;

          if (inclusionSize != 0) {
            const localInclusions = [];
            for (const a = 0; a < inclusionSize; a++) {
              localInclusions[a] = rows.eq(i).children().eq(1).children().eq(1).children().eq(a).text().trim();
            }
          }

          if (exclusionSize != 0) {
            const localExclusions = [];
            for (const a = 0; a < exclusionSize; a++) {
              localExclusions[a] = rows.eq(i).children().eq(1).children().eq(3).children().eq(a).text().trim();
            }
          }
          json.inclusion_criteria = localInclusions;
          json.exclusion_criteria = localExclusions;
        }

        if (tempField.contains("Gender")) {
          const tempGender = tempValue;

          if (tempGender.contains("All")) {
            json.gender = "Both";
          } else if (tempGender.contains("M") || tempGender.toLowerCase().contains("male")) {
            json.gender = "Male";
          } else if (tempGender.contains("F") || tempGender.toLowerCase().contains("female")) {
            json.gender = "Female";
          } else {
            json.gender = "Not specified";
          }
        }

        if (tempField.contains("Age")) {

          const tempAge = tempValue;

          if (tempAge.toLowerCase().contains("younger")) {
            json.min_age = 0;
            json.max_age = tempAge.replace(/[^0-9]/g,'');;
          } else if (tempAge.toLowerCase().contains("older")) {
            json.min_age = tempAge.replace(/[^0-9]/g,'');;
            json.max_age = 125;
          } else if (tempAge.toLowerCase.contains("to")) {
            const combAges = tempAge.replace(/[^0-9]/g,'');
            if (ParseInt(combAges) >= 100 && ParseInt(combAges) < 1000) {
              json.min_age = ParseInt(combAges.substring(0, 1));
              json.max_age = ParseInt(combAges.substring(1, 3));
            } else if (ParseInt(combAges) >= 1000 && ParseInt(combAges) < 10000) {
              json.min_age = ParseInt(combAges.substring(0, 2));
              json.max_age = ParseInt(combAges.substring(2, 4));
            } else {
              json.min_age = ParseInt(combAges.substring(0, 2));
              json.max_age = ParseInt(combAges.substring(2, 5));
            }
          } else {
            json.min_age = "0";
            json.max_age = "0";
          }
        }

        if (tempField.contains("NCT Number")) {
          json.nct_id = tempValue;
        }

        if (tempField.contains("Other Study ID Number")) {
          let id_fields = document.querySelectorAll('.ct-data_table .ct-header3');
          let splittedText = null;
          for (var k = 0; k < id_fields.length; k++) {
            if (!id_fields[k].innerText.includes('Other Study ID Numbers')) continue;
            splittedText = id_fields[k].nextElementSibling.innerText.split('\n');
          }
          console.log(splittedText);
          json.other_ids = splittedText;
        }
        
        if (tempField.contains("Responsible Party")) {
          json.responsible_party = tempValue;
        }

        if (tempField.contains("Study Sponsor")) {
          json.study_sponsor = tempValue;
        }

        if (tempField.contains("Collaborator")) {
          const collabSize = rows.eq(i).children().eq(1).children().children().length;

          if (collabSize != 0) {
            const localCollabs = [];
            for (const a = 0; a < collabSize; a++) {
              localCollabs[a] = rows.eq(i).children().eq(1).children().children().eq(a).text().trim();
            }
          }
          json.collaborators = localCollabs;
        }

        if (tempField.contains("Investigator")) {
          const investigatorSize = rows.eq(i).children().eq(1).children().children().length;

          if (investigatorSize != 0) {
            const localInvestigators = [];
            for (const a = 0; a < investigatorSize; a++) {
              localInvestigators[a] = rows.eq(i).children().eq(1).children().children().eq(a).text().trim();
            }
          }
          json.investigators = localInvestigators;
        }
        i++;
      }
      
      await page.close();
      await backendAPI.post({ url: 'trials/update/trialId', data: { isDeleted: false, ...json } });
    } catch(e) {

      await backendAPI.post({ url: 'trials/update/trialId', data: { isDeleted: false } });
      console.log(e);
      await page.close();
      throw e;
    }
  }
}

module.exports = ParseIndividual;