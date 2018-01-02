# AlbionStatus website

The frontend of https://albionstatus.com.

## Getting Started


These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
See deployment for notes on how to deploy the project on a live system.

Be sure to look into the repositories of the [microservice](https://github.com/manniL/albionstatus-microservice)
and the [scraper and twitter bot](https://github.com/manniL/albionstatus-scraper-bot/) too. It is meant to work altogether.

### Prerequisites

To setup the website on your machine, you'll need:

* A web server (I've tested it with Apache2)
* An API that delivers you the server status
* [NodeJS and NPM](https://nodejs.org/)

Okay, you got these? Great, let's continue!

### Installing

1. Pull the application and switch to the correct branch (mostly `develop`, or `master` if you want to deploy)
2. Get all dependencies by using `npm install`
3. Process the assets with `npm run production` or `npm run dev`, depending on what you want to do.
4. Copy the "public" folder to your web server root.


## Deployment

Deployment works similar to installation. Just go for `master` instead of `develop` and use `npm run production`

## Possible errors and there solutions

None known by now

## Built With

* [NodeJS and NPM](https://nodejs.org/) - Backend javascript and dependency
management
* [VueJS](http://vuejs.org/) - Lightweight but powerful Javascript framework. It just works!

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, take a look in [our repository](https://github.com/manniL/albionstatus-website).

## Contribution

Contributions are welcome at any time! Just make sure that you follow the [JS Standard Style](https://standardjs.com/rules.html) and common good practices when contributing.
If you see parts of the code that don't follow those rules, feel free to submit a PR to fix that!

## Authors

* **Alexander Lichter** - *Main work on the project* - [Website](https://lichter.io) - [BitBucket](https://bitbucket.org/manniL/) - [Github](https://github.com/manniL) - [StackOverflow](http://stackoverflow.com/users/3975480/mannil)

See also the [list of contributors](https://github.com/manniL/albionstatus-website/contributors) who participated in this project.

## License

See [LICENSE file](https://github.com/manniL/albionstatus-website/blob/master/LICENSE)
