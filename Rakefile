task :install do
    sh "npm install"
    sh "bower-installer"
    sh "rm -r glyph* bootstrap.less public/jquery/ public/js/jquery/ public/js/bootstrap/"
    sh "gulp less js html data"
end

task :server do
    sh "node server.js"
end
