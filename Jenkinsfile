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
    }

    post {
        success {
            echo '¡El pipeline se ha completado exitosamente! Ejecutando segundo pipeline...'
            build job: 'FrontendStorePipeline2', parameters: [
                string(name: 'BUILD_NUMBER', value: "$currentBuild.number"),
                string(name: 'DIST_PATH', value: "dist/")
            ]
        }
        failure {
            echo '¡El pipeline ha fallado!'
        }
    }

}