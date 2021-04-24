# GetWellSoon [Aggregation]

This project is backed by the Node (>=10.0.0) and based upon the layered architecture.
<br/><br/>
## DIRECTORY STRUCTURE
```
├── config
│    ├── prod.js
│    ├── local.js
│    └── default.js
│   
├── src
│    ├── routes
│    │   ├── clinicalTrials.js
│    │   └── index.js
│    │ 
│    ├── controllers
│    │   └── ClinicalTrials.js
│    │ 
│    ├── services
│    │   └── ClinicalTrials
│    │       ├── ParseListing.js
│    │       ├── ParseIndividual.js
│    │       └── index.js
│    │ 
│    ├── helpers
│    │   └── PuppeteerHelper.js
│    │ 
│    └── utils
│        └── index.js
│
├── app.js
│
├── index.js
│
└── README.md
```

|Directory|Nomenclature|Purpose|
|----|-----|-------| 
|./config|Name could be only prod/demo/local/default|This will be storing all required configurations to manage this application|
|./src/routes|Process name(Camelcase only)|Route will basically map path with respective controllers.|
|./src/controllers|1. Process name(Pascal case only)<br/>2. Controllers are class.|1. Controller will only manage coming request and response.<br/>2. This will never going to perform any kind of calculation.|
|./src/services|1. Process name(Pascal case only)<br/>2. Service related to a Process should be enapsulated inside a diretory named after the proess. Within this directory their will be different services in form of the class.|Service is specific to some task. It is called only by a controller. In turn, it performs operation and return the possible output.
|./src/helpers|1. Helper name(Pascal case only)<br/>2. Helpers are classes, used to simplify some repeatitive but a complex task.|Helper can be called by a service, to perform some specific task which is common among several other service.|
|./src/utils|1. Meaningful name(Camelcase only)<br/>2. Preferred to be defined in the index.js only|Utils contain some generic function, which can be used to avoid multiple declaration of that function|
<br/><br/>
## LOCAL SETUP [OS: Linux based]

1. Make sure your system have pre-installed node(`>=v10.0.0`) and npm(`>=v6.0.0`)/yarn(`>=v1.19.1`).
2. Take the checkout of the repository with your valid Git credentials.
3. Now, inside the Aggregation directory execute `yarn install`. This will going to install all the required modules used for development.
4. After the successfull installation, rename `.env.example` to `.env`
5. Setup is almost ready, now for the development run `yarn start`. You will find node have started to listen a port.
> In development, you will not require to execute start script after each code change. [nodemon](https://www.npmjs.com/package/nodemon) is there to take care of this. So just keep your focus on coding.