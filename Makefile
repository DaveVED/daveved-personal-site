ifndef VERBOSE
MAKEFLAGS += --no-print-directory
endif
SHELL := /bin/bash
.DEFAULT_GOAL := help

STACK_NAME ?= daveved-spa
TEMPLATE_FILE ?= website.yaml
BUCKET_NAME ?= daveved.com
PROFILE ?= dennis-family
REGION ?= us-east-1
CERTIFICATE_ARN ?= arn:aws:acm:us-east-1:007794960432:certificate/c3b4772f-d2b3-4afe-94bc-436e5f80b11d
HOSTED_ZONE_ID ?= Z0856937EHR519NX27W
BUILD_DIR := daveved-ui/build

help:
	@echo "Available targets:"
	@echo "  help             - Show this help message"
	@echo "  lint             - Validate the CloudFormation template"
	@echo "  infra            - Deploy the CloudFormation stack"
	@echo "  deploy           - Deploy the React app"
	@echo "  app              - Deploy the React app"
	@echo "  destroy          - Delete the CloudFormation stack"

lint:
	@echo "Validating CloudFormation template..."
	aws cloudformation validate-template \
		--profile ${PROFILE} \
		--region ${REGION} \
		--template-body file://${TEMPLATE_FILE}

infra:
	@echo "Deploying CloudFormation stack..."
	aws cloudformation deploy \
		--stack-name ${STACK_NAME} \
		--template-file ${TEMPLATE_FILE} \
		--profile ${PROFILE} \
		--region ${REGION} \
		--parameter-overrides ReactAppBucketName=${BUCKET_NAME} CertificateArn=${CERTIFICATE_ARN} HostedZoneId=${HOSTED_ZONE_ID}

get-s3-url:
	@echo "Getting the React app URL..."
	$(eval APP_URL=$(shell aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='ReactAppURL'].OutputValue" --output text))
	@echo "React app URL: ${APP_URL}"

app: get-s3-url
	@echo "Building the React app..."
	cd daveved-ui && npm run build
	@echo "Uploading files to the S3 bucket..."
	aws s3 sync ${BUILD_DIR}/ s3://${BUCKET_NAME}/
	@echo "React app deployed successfully."

deploy: app

destroy:
	@echo "Deleting CloudFormation stack..."
	aws cloudformation delete-stack \
		--stack-name ${STACK_NAME}
