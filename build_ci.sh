cd /Users/rakeshnair/develop/certify/dashboard

#Create a New Directory
mkdir ../ci-workspace

#copy the contents of your current directory into the new one. The --exclude flags are key to mimicking a clean checkout by leaving out generated files.
rsync -av . ../ci-workspace --exclude node_modules --exclude dist --exclude .git

#Move into the New Directory
cd ../ci-workspace

#Install Dependencies
#Reads the  package.json file and downloads all the necessary packages for building, testing, and running your applicatio
npm install

#Lint the Code
ng add angular-eslint
ng lint

# test
ng test --watch=false --browsers=ChromeHeadless

#This command invokes the Angular CLI to build the application. It uses production-level optimizations
#like minification and tree-shaking to create a small and efficient set of output files in the dist/ directory.
npm run build

#start to test make sure healthchek and dashoard works
npm start

docker build -t dashboard-app .
docker run -p 8080:8080 dashboard-app

