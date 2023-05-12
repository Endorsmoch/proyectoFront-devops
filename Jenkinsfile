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
                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                    bat 'npm run test'
                }
            }
        }
    }
}