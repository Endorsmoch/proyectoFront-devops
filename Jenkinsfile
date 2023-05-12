pipeline {
    agent any
    
    stages {
        stage('Compilar proyecto') {
            steps {
                bat 'npm install'
                bat 'npm run build --prod'
            }
        }

        stage('Probar proyecto') {
            steps {
                script {
                    try {
                        bat 'npm run test'
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                    }
                }
            }
        }
    }
}