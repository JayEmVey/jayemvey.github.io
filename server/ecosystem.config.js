{
  "apps": [
    {
      "name": "gate7-coffee",
      "script": "server.js",
      "instances": 1,
      "autorestart": true,
      "watch": false,
      "time": true,
      "env": {
        "NODE_ENV": "production",
        "PORT": 3000
      }
    }
  ]
}