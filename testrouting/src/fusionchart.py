from fusionexport import ExportManager, ExportConfig 

# Instantiate the ExportConfig class and add the required configurations
export_config = ExportConfig()

# Provide path of the chart configuration which we have defined above.
# You can also pass the same object as serialized JSON.
export_config["chartConfig"] = open("app/home/chart-config-file.json",'r')

# ATTENTION - Pass the path of the dashboard template
export_config["templateFilePath"] = "app/home/home.component.html.html"

# Provide port and host of FusionExport Service
export_server_host = "127.0.0.1"
export_server_port = 1337

# Instantiate the ExportManager class
em = ExportManager(export_server_host, export_server_port)

# Call the export() method with the export_config as its argument
em.export(export_config, outputDir = "./app", unzip = True)