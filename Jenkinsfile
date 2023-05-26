pipeline {
  agent any

  stages {
    stage('Conexión SSH y comandos en la máquina virtual') {
      steps {
        script {
          // Dirección IP de la máquina virtual
          def vmIP = '192.168.0.26'
          // Nombre de usuario para la conexión SSH
          def sshUser = 'ubuntu'
          // Ruta de la clave privada SSH en Jenkins
          def sshKeyPath = '/ruta/a/clave-privada-ssh'
          bat 'sshpass -p ubuntu ssh ubuntu@192.168.0.26'
          bat 'ls'
          //"cd ..; cd..; cd /var/www/html; git pull origin devops/Front-23"'

          // Conexión SSH y ejecución de comandos en la máquina virtual
        //   sshCommand remote: sshUser + '@' + vmIP, command: """
        //     # Comandos que deseas ejecutar en la máquina virtual
        //     echo 'Hola desde la máquina virtual'
        //     ls -la /ruta/de/tu/proyecto
        //     sudo systemctl restart nginx
        //   """, keyFile: sshKeyPath
        }
      }
    }
  }
}


// pipeline {
//     agent any
    
//     stages {
//         stage('Compilar proyecto') {
//             steps {
//                 bat 'npm install'
//                 bat 'npm run build --prod'
//             }
//         }
//         stage('Test Cases') {
//             steps {
//                 bat 'ng test --browsers=ChromeHeadless --watch=false'
//             }
//         }
//     }

//     post {
//         success {
//             echo '¡El pipeline se ha completado exitosamente! Ejecutandose segundo pipeline...'
//             build job: 'FrontendStorePipeline2', parameters: [string(name: 'BUILD_NUMBER', value: "'$currentBuild.number'")]
//         }
//         failure {
//             echo '¡El pipeline ha fallado!'
//         }
//     }
// }