pipeline {
    agent { docker { image 'python:3.7.2-alpine' } }
    stages {
        stage('build') {
            steps {
                sh 'python --version'
            }
        }
    }
}