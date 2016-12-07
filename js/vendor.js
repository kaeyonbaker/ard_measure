var SerialPort = require('serialport');
SerialPort.list(function(err, ports) {
    // ports.forEach(function(port) {
    //   console.log(port.comName);
    //   console.log(port.pnpId);
    //   console.log(port.manufacturer);
    // });
    $(document).ready(function() {
        // $('#serialDropdown').material_select();
        $('#bdrate').material_select();
        $('#parity_bit').material_select();
        $('#data_bit').material_select();
        $('#stop_bit').material_select();


        // var serialHtml = "<option value=\"blank\">Select a port</option>";
        ports.forEach(function(port) {
            $("#serialDropdown").append("<option value=\"" + port.comName + "\">" + port.comName + "</option>");
            $('#serialDropdown').material_select();
        });
        //populating the baud rate dropdown
        // var baudArray = [300, 600, 1200, 2400, 4800, 9600, 14400, 19200, 28800, 38400, 57600, 115200];
        // for (i = 0, max = baudArray.length; i < max; i++) {
        //     $("#baudDropdown").append("<option value=\"" + baudArray[i] + "\">" + baudArray[i] + "</option>");
        // }


        $("#open_port").click(function() {
          if ($('#serialDropdown').val().indexOf("COM")==-1){
            alert("choose port")
            return
          }
            var comN = new SerialPort($('#serialDropdown').val(), {
                baudrate: parseInt($('#bdrate').val()),
                databits: parseInt($('#data_bit').val()),
                stopbits:parseInt($('#stop_bit').val()),
                parity: $('#parity_bit').val(),
                parser: SerialPort.parsers.readline('\n')
            });

            comN.on('data', function(data) {
                console.log(data);
            })
            comN.on('open', function() {
                console.log('Port open');

                setInterval(function() {
                    // console.log("port  to write!")
                    comN.write('m\n', function(err) {
                        if (err) {
                            return console.log('Error on write: ', err.message);
                        }
                        console.log('message written');

                    });
                }, 3000)
            });
        })
    })
});
