# Simple ToDo application

Just me practicing with Angular, Bootstrap, Express, Bower, Gulp.

## How to install and run

Follow these steps:

### Install Node.js and Node Package Manager (NPM)

Check if you have them installed already:

```shell
node -v && npm -v
# The output on my machine:
# v0.13.0-pre
# 1.4.28
```

*As for now, Node.js comes with NPM so you only need to install Node.js itself.*

If you are using Ubuntu, you can install it using `apt-get`: 

```shell
curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt-get install -y nodejs
```


#### Useful links

Visit [this wiki page](https://github.com/joyent/node/wiki/installing-node.js-via-package-manager) for more information.


Or you can always build Node.js from source code:

```shell
git clone https://github.com/joyent/node.git && cd node
./configure
make
sudo make install
```


#### Useful links

Visit [this wiki page](https://github.com/joyent/node/wiki/installation#building-on-linux) for more information.


### Clone the repository

Simple stuff here:

```shell
git clone https://github.com/bound1ess/todo-app.git && cd todo-app
```

### Run Rake to install dependencies

*You will need Rake for this one, and I assume you do have it installed.*

You can ensure that you do so by running the following command:

```shell
rake --version
# The output on my machine:
# rake, version 10.4.2
```

Otherwise you should install Ruby first (Ruby Version Manager is the preferable way to do it).

```shell
gpg --keyserver hkp://keys.gnupg.net --recv-keys D39DC0E3
\curl -sSL https://get.rvm.io | bash -s stable --ruby
```

And then you can install the Rake gem itself:

```shell
gem install rake
rake --version
```


#### Useful links

Visit [ruby-lang.org](https://www.ruby-lang.org/en/) for more information about Ruby.

Visit [rvm.io](http://rvm.io/) for more information about Ruby Version Manager (RVM).

Visit [rubygems.org](https://rubygems.org/gems/rake) for more information about Rake.


Now the final step, assuming that you are in `todo-app` directory:

```shell
rake install
rake server

# Now you can visit http://localhost:8000 in your browser.
```


#### Troubleshooting

If you are getting `command not found: bower-installer` error or something like that, make sure to edit your `.bashrc` file (or `.zshrc` or whatever) and add this line:

```shell
export PATH=$PATH:~/.node/bin
```

Then reload the terminal and try again.

## Documentation checklist

To help me with writing documentation.

### Project folder

- `README.md` [self-explanatory]
- `LICENSE` [self-explanatory]
- `package.json` [self-explanatory]
- `bower.json` [self-explanatory]
- `Gulpfile.js` [documented]
- `server.js` [documented]
- `Rakefile` [documented]

### Source folder

- `data/tasks.json` [self-explanatory]
- `html/index.html` [work in progress]
- `html/task.html` [work in progress]
- `html/new-task.html` [work in progress]
- `js/app.js` [work in progress]
- `less/import/variables.less` [work in progress]
- `less/main.less` [work in progress]

## License

The MIT license (see the `LICENSE` file for more details).
