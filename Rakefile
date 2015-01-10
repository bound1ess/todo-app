# rake install
# This task installs all the application dependencies and populates the public/ directory.
# NPM (Node Package Manager), Bower (and bower-installer) and Gulp are being used here.
task :install do
    # This command tells NPM to install dependencies described in package.json.
    sh "npm install"
    # This command runs Bower to install all needed packages (described in bower.json).
    # Unlike Bower, bower-installer installs only "main" files, not entire repositories.
    # And that is exactly what we need here.
    # See https://www.npmjs.com/package/bower-installer for more information.
    sh "bower-installer"
    # This command removes files (and directories) that we do not need.
    sh "rm -r glyph* bootstrap.less public/jquery/ public/js/jquery/ public/js/bootstrap/"
    # This command tells Gulp.js to run 4 tasks: less, js, html, data.
    # See Gulpfile.js for detailed information about these.
    sh "gulp less js html data"
end

# rake server
# This task performs a development server setup.
# Node.js and Express framework are being used here.
task :server do
    # This command tells Node.js to execute server.js file, which will setup an Express app.
    # Which you can later get access to by visiting http://localhost:8000.
    sh "node server.js"
end
