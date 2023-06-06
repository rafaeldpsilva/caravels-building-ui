sudo docker stop tiocps-building-monitoring-ui
sudo docker rm tiocps-building-monitoring-ui
sudo docker rmi rdpds/tiocps-building-monitoring-ui
sudo docker pull rdpds/tiocps-building-monitoring-ui:latest
sudo docker run -d --name tiocps-building-monitoring-ui -p 8081:8080 rdpds/tiocps-building-monitoring-ui
