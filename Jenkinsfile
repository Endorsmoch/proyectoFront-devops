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
                bat 'npm run test'
            }
        }
    }
}