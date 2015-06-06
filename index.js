
var dbox  = require('dbox')
  , fs = require('fs')
  , _path = require('path')
  , conf = require(_path.join(__dirname, 'settings.json'));

var downloadedFile = _path.join(__dirname, 'downloaded.json');

if(!fs.existsSync(downloadedFile))
  fs.writeFileSync(downloadedFile, '[]', 'utf-8');

var downloaded = JSON.parse(fs.readFileSync(downloadedFile, 'utf-8'));

var app = dbox.app(conf.app_key)
  , client = app.client(conf.access_token);

var doSync = function(){

  console.log('Doing sync');

  function downloadFile(path) {

    downloaded.push(path);
    fs.writeFileSync(_path.join(__dirname, 'downloaded.json'), JSON.stringify(downloaded), 'utf-8');

    client.get(path, {root: 'dropbox'}, function(status, buffer, metadata){
      
      var path = _path.join(conf.local_sync_dir, metadata.path.replace(/^.*[\\\/]/, ''));

      fs.open(path, 'w', function(err, fd) {
        if (err)
          throw 'error opening file: ' + err;
        
        fs.write(fd, buffer, 0, buffer.length, null, function(err) {
          if (err) throw 'error writing file: ' + err;
          fs.close(fd, function() {
            console.log('Done!');
          })
        });
      });
    });
  }

  client.metadata('/Torrents', {root: 'dropbox'}, function(status, reply){
    for(var i in reply.contents){
      if(!reply.contents[i].is_dir && downloaded.indexOf(reply.contents[i].path) === -1)
        downloadFile(reply.contents[i].path);
    }
  });

};

doSync();

setInterval(doSync, 10 * 1000);