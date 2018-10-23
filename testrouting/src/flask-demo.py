from flask import Flask
#from flask import request
from fusionexport import ExportManager, ExportConfig 


app = Flask(__name__)


@app.route('/callfusionexport')
def index():
    # Instantiate the ExportConfig class and add the required configurations
    export_config = ExportConfig()

# Provide path of the chart configuration which we have defined above.
# You can also pass the same object as serialized JSON.
    export_config["chartConfig"] = open("C:/Users/a563684/Documents/Angular/testrouting/src/app/home/chart-config-file1.json",'r').read()

# ATTENTION - Pass the path of the dashboard template
    export_config["templateFilePath"] = "C:/Users/a563684/Documents/Angular/testrouting/src/app/home/dashboard-template.html"

# Provide port and host of FusionExport Service
    export_server_host = "127.0.0.1"
    export_server_port = 1337

# Instantiate the ExportManager class
    em = ExportManager(export_server_host, export_server_port)

# Call the export() method with the export_config as its argument
    em.export(export_config, output_dir=".", unzip = True)
    return "Hello, Fusion"

@app.route('/')
def hello():
    return "Hello, World"

if __name__ == '__main__':
    app.run(debug=True)