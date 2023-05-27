pipeline {
    agent any
    
    stages {
        stage('Compilar proyecto') {
            steps {
                bat 'npm install'
                bat 'npm run build --prod'
            }
        }
        // stage('Test Cases') {
        //     steps {
        //         //bat 'ng test --browsers=ChromeHeadless --watch=false'
        //     }
        // }
        stage('Archive Artifact') {
            steps {
                bat('echo %cd%')
                bat('dir')

                archiveArtifacts artifacts: 'dist/', fingerprint: true
            }
        }
    }

    post {
        def path = "echo %cd%"
        success {
            echo '¡El pipeline se ha completado exitosamente! Ejecutando segundo pipeline...'
            build job: 'FrontendStorePipeline2', parameters: [
                string(name: 'BUILD_NUMBER', value: "$currentBuild.number"),
                string(name: 'DIST_PATH', "${path}/dist/")
            ]
        }
        failure {
            echo '¡El pipeline ha fallado!'
        }
    }

}