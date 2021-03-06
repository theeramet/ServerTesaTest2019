var Parser = require("binary-parser").Parser;
var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const mongo_string = "mongodb://mongo:27017"

const client = new MongoClient(mongo_string);

const util = require("util");

function decode(payload) {
  const temp_sensor = Parser.start()
    .endianess('big')
    .int16('temp', {
        formatter: function(val) {
            return Number( (val * 0.1).toFixed(1) );
        }
    });
  //Digi input
  const digi_input = Parser.start()
    .endianess('big')
    .int8('Dinput');
  //Digi output
  const digi_output = Parser.start()
    .endianess('big')
    .int8('Doutput');
  //Analog input
  const Analog_input = Parser.start()
    .endianess('big')
    .int16('Ainput',{
        formatter: function(val) {
            return Number((val*0.01).toFixed(2));
        }
    });
  const Analog_output = Parser.start()
    .endianess('big')
    .int16('Aoutput',{
        formatter: function(val) {
            return Number((val*0.01).toFixed(2));
        }
    });
  //Illuminance Sensor
  const luminance_sensor = Parser.start()
    .endianess('big')
    .int16('luminance');
  //Presence Sensor
  const Presence_Sensor = Parser.start()
    .endianess('big')
    .int8('presence');
  //Humidity Sensor
  const Humidity_Sensor = Parser.start()
    .endianess('big')
    .uint8('hum',{
        formatter: function(val){
            return Number((val*0.5).toFixed(1));
        }
    });
  //Accelerometer
  const Accelerometer = Parser.start()
    .endianess('big')
    .int16('acc_X',{
        formatter: function(val){
            return Number((val*0.001).toFixed(3));
        }
    })
    .int16('acc_Y',{
        formatter: function(val){
            return Number((val*0.001).toFixed(3));
        }
    })
    .int16('acc_Z',{
        formatter: function(val){
            return Number((val*0.001).toFixed(3));
        }
    });
  //Barometer
  const Barometer = Parser.start()
    .endianess('big')
    .int16('baro',{
        formatter: function(val){
            return Number((val*0.1).toFixed(1));
        }
    });
  //Gyrometer
  const Gyrometer = Parser.start()
    .endianess('big')
    .int16('gyro',{
        formatter: function(val){
            return Number((val*0.01).toFixed(2));
        }
    });

  //GPS Location
  const  GPS = Parser.start()
    .endianess('big')
    .array("lat", {
        type: "uint8",
        length: 3,
        formatter: function(val){
            return Number( (((val[0]<<24 | val[1]<<16 | val[2]<< 8)>>8) * 0.0001).toFixed(4) );
        }
    })
    .array("long", {
        type: "uint8",
        length: 3,
        formatter: function(val){
            return Number( (((val[0]<<24 | val[1]<<16 | val[2]<< 8)>>8) * 0.0001).toFixed(4) );
        }
    })
    .array("att", {
        type: "uint8",
        length: 3,
        formatter: function(val){
            return Number( (((val[0]<<24 | val[1]<<16 | val[2]<< 8)>>8) * 0.01).toFixed(2) );
        }
    });

  const gabage1 = Parser.start()
    .endianess('big')
    .uint16("GB1");

  var stop = new Parser();

  const LoRa = Parser.start()
    .endianess('big')
    .uint8('Channel')
    .uint8('type')
    .choice({
        tag: "type",
        choices: {
            0x67: temp_sensor,
            0x00: digi_input,
            0x01: digi_output,
            0x02: Analog_input,
            0x03: Analog_output,
            0x65: luminance_sensor,
            0x66: Presence_Sensor,
            0x68: Humidity_Sensor,
            0x71: Accelerometer,
            0x73: Barometer,
            0x86: Gyrometer,
            0x88: GPS
            // 0xf0: gabage1
            
        },
        defaultChoice: stop
    });

  const parser = Parser.start()
    .array("decoded", {
        type: LoRa,
        readUntil: "eof"
    });

  const buff = Buffer.from(String(payload), "hex");

  return ( util.inspect( parser.parse(buff),{ depth: null } ) );
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  client.connect( (err) => {
    const db = client.db("test");
    const collection = db.collection('tb1');
    collection.find({}).toArray((err, docs) => {
      const dec = decode(docs[docs.length - 1].DevEUI_uplink.payload_hex);
      res.send(dec);
    });
  });
});

// POST method route
router.post('/post', function (req, res) {
  
});

module.exports = router;
