const PuppeteerHelper = require('../../helpers/PuppeteerHelper');

class ParseIndividual extends PuppeteerHelper {
  constructor(props) {
    super();
  }
  
  async execute(url) {
    const page = await this.getNewPage(); // pass false as an argument if you required to debug 
    await page.goto(url, { timeout: 60000 });

    try {
      let data = {};
      await page.waitForSelector('.accordion-control__button.open');
      await page.click('.accordion-control__button.open');

      // Status & name
      const $_status = await page.$('.trial-status-indicator');
      if ($_status) {
        data.status = await $_status.evaluate(el => el.innerText.replace('Trial Status: ', ''));
      }

      const $_name = await page.$('.trial-description-page h1');
      if ($_name) {
        data.name = await $_name.evaluate(el => el.innerText);
      }

      // Description
      const $_description = await page.$('#component-unique-id-1-content');
      if ($_description) {
        data.description = await $_description.evaluate(el => el.innerText);
      }

      // Eligibility criteria
      const $_criterias = await page.$$('.eligibility-criteria > h3');
      if ($_criterias.length) {
        let criterias = [];

        for(const $_criteria of $_criterias) {
          const criteriaType = await $_criteria.evaluate(el => el.innerText);
          const criteriaData = await $_criteria.evaluate(el => el.nextSibling.innerHTML);

          criterias.push({ type: criteriaType, html: criteriaData });
        }

        data.criterias = criterias;
      }

      // Locations & contacts
      const $_states = await page.$$('#component-unique-id-3-content .sites-all > .location-state');
      let states = [];
      if ($_states.length) {
        for(const $_state of $_states) {
          const state = await $_state.$eval('h4', $_h4 => $_h4.innerText);

          // cities
          const $_cities = await $_state.$$('.location-city');
          let cities = [];
          if ($_cities.length) {
            for(const $_city of $_cities) {
              const city = await $_city.$eval('h5', $_h5 => $_h5.innerText);

              // locations
              const $_locations = await $_city.$$('.location');
              let locations = [];
              if ($_locations.length) {
                for (const $_location of $_locations) {
                  let location = {};
                  location.name = await $_location.$eval('.location-name', $_locationName => $_locationName.innerText);

                  const $_details = await $_location.$$('div');
                  if ($_details.length) {
                    const labelsLookup = { 'Status': 'statues', 'Contact': 'contact', 'Phone': 'phone' };

                    for (const $_detail of $_details) {
                      const match = (await $_detail.evaluate(el => el.innerText)).split(':');
                      const label = labelsLookup[match[0].trim()];
                      if (label && match.length == 2) {
                        location[label] = match[1].trim();
                      }
                    }
                  }

                  locations.push(location);
                }
              }

              cities.push({ city, locations });
            }
          }

          states.push({ state, cities });
        }
      }
      data.locations = states;

      // Trial objectives & outline
      data.outline = await page.$eval('.trial-objectives-outline', $_outline => $_outline.innerHTML);

      // Trial phase & type
      data.trialPhase = await page.$eval('#component-unique-id-5-content .trial-phase', elem => elem.innerText.replace('Trial Phase', ''));
      data.trialType = await page.$eval('#component-unique-id-5-content .trial-type', elem => elem.innerText.replace('Trial Type', ''));

      // Lead organisation
      data.leadOrg = await page.$eval('#component-unique-id-6-content .leadOrg', elem => elem.innerText.replace('Lead Organization', ''));
      data.investigator = await page.$eval('#component-unique-id-6-content .investigator', elem => elem.innerText.replace('Principal Investigator', ''));

      // Trial IDs
      const $_trialIds = await page.$$('ul.trial-ids > li');
      if ($_trialIds.length) {
        let trialIds = {};
        const labelLookup = {'Primary ID': 'primary', 'Secondary IDs': 'secondary', 'ClinicalTrials.gov ID': 'government'};

        for( const $_trialId of $_trialIds ) {
          const label = await $_trialId.$eval('.field-label', el => el.innerText);
          const value = (await $_trialId.evaluate(el => el.innerText)).replace(label, '').trim();
          trialIds[labelLookup[label]] = label == 'Secondary IDs' ? value.split(', ') : value;
        }

        data.trialIds = trialIds;
      };

      await page.close();
      // TODO::send API request
      console.log(data);
      return data;
    } catch(e) {
      console.log(e);
      await page.close();
      throw e;
    }
  }
}

module.exports = ParseIndividual;