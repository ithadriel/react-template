#!/usr/bin/env groovy
def MAJOR_BUILD_NUMBER = '1'
def APPLICATION = "Template-v${MAJOR_BUILD_NUMBER}"

def BUILD_NUMBER = env.BUILD_NUMBER
def FULL_BUILD_VERSION = "${MAJOR_BUILD_NUMBER}.0.${BUILD_NUMBER}"
def JAR_FILE_NAME = "Template-${FULL_BUILD_VERSION}.jar"

def stopBuild = 'N'

def COMMIT_ID

def userInput

// initialization
node {
    stage('Cleanup WS') {
        step([$class: 'WsCleanup'])
    }
    checkout scm
    COMMIT_ID = sh (
            script: 'git rev-parse HEAD',
            returnStdout: true
    ).trim()
}

pipeline {
    agent { docker { image 'node:6.3' } }
    stages {
        stage('build and test') {
            steps {
                sh 'npm cache clear'
                sh 'npm i; ./gradlew clean build'
            }
        }
    }
}
