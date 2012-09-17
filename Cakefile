fs = require 'fs'
{print} = require 'util'
{spawn, exec} = require 'child_process'


files = [ "index" ]

# ANSI Terminal Colors
bold = '\x1b[0;1m'
green = '\x1b[0;32m'
reset = '\x1b[0m'
red = '\x1b[0;31m'

# Cakefile Tasks
task 'build', 'compile source', -> build -> log ":)", green

task 'watch', 'compile and watch', -> build true, -> log ":-)", green

log = (message, color, explanation) ->
  console.log color + message + reset + ' ' + (explanation or '')

launch = (cmd, options=[], callback) ->
  app = spawn cmd, options
  app.stdout.pipe(process.stdout)
  app.stderr.pipe(process.stderr)
  app.on "exit", (status) -> callback?() if status is 0


build = (watch, callback) ->
  if typeof watch is "function"
    callback = watch
    watch = false

  options = [ "-c" ]
  options = options.concat files
  options.unshift '-w' if watch

  launch 'coffee', options, callback

