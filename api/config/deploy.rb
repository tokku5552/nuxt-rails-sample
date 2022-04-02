# config valid for current version and patch releases of Capistrano
lock "~> 3.17.0"

set :application, "api"
set :repo_url, "git@github.com:tokku5552/nuxt-rails-sample.git"
set :rbenv_ruby, File.read('.ruby-version').strip
set :branch, ENV['BRANCH'] || "hotfix/fix-secupdate-puma"
set :nginx_config_name, "#{fetch(:application)}.conf"
set :nginx_sites_enabled_path, "/etc/nginx/conf.d"
set :deploy_to, '/var/www/api'

append :linked_files, "config/master.key"
append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "node_modules"

namespace :deploy do
    task :change_release_path do
      on roles(:web) do |_host|
        set(:release_path, release_path.join('api'))
      end
    end
end
  
after 'git:create_release', 'deploy:change_release_path'