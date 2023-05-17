pipeline {
    agent any
    
    stages {
        stage('Compilar proyecto') {
            steps {
                bat 'npm install'
                bat 'npm run build --prod'
            }
        }
        stage('Ejecutar Test Cases') {
            steps {
                bat '"test:ci": "ng test --watch=false --browsers=ChromeHeadlessNoSandbox && echo 'hello'",'
            }
        }
    }

    post {
        success {
            echo '¡El pipeline se ha completado exitosamente! Ejecutandose segundo pipeline...'
            build job: 'FrontendStorePipeline2', parameters: [string(name: 'BUILD_NUMBER', value: "'$currentBuild.number'")]
        }
        failure {
            echo '¡El pipeline ha fallado!'
        }
    }
}