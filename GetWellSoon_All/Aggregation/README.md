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
## SETUP [Linux based]

1. Make sure your system is having node(>=10.0.0) and npm(>=6.0.0.)/yarn(>=1.19.1) pre-installed.
2. Take the checkout of the repository with your valid Git credentials.
3. Now, inside the Aggregation directory execute `yarn install`. This will going to install all the required basic required modules.
4. Once all the required modules get installed, then run the `yarn start` for the development.
> In development, you will not require to execute start sript after each code change. [nodemon](https://www.npmjs.com/package/nodemon) is there to take care oof this. So you just keep focus on coding.