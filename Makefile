ifndef VERBOSE
MAKEFLAGS += --no-print-directory
endif
SHELL := /bin/bash
.DEFAULT_GOAL := help

STACK_NAME ?= daveved-spa
TEMPLATE_FILE ?= website.yaml
LANDING_BUCKET_NAME ?= daveved.com
BLOG_BUCKET_NAME ?= blog.daveved.com
PROFILE ?= dennis-family
REGION ?= us-east-1

help:
	@echo "Available targets:"
	@echo "  help             - Show this help message"
	@echo "  lint             - Validate the CloudFormation template"
	@echo "  build            - Deploy the CloudFormation stack"
	@echo "  deploy           - Deploy both the landing page and the blog"
	@echo "  deploy-landing   - Deploy the landing page"
	@echo "  deploy-blog      - Deploy the blog"
	@echo "  destroy          - Delete the CloudFormation stack"

lint:
	@echo "Validating CloudFormation template..."
	aws cloudformation validate-template \
		--template-body file://${TEMPLATE_FILE}

build:
	@echo "Deploying CloudFormation stack..."
	aws cloudformation deploy \
		--stack-name ${STACK_NAME} \
		--template-file ${TEMPLATE_FILE} \
		--parameter-overrides LandingBucketName=${LANDING_BUCKET_NAME} BlogBucketName=${BLOG_BUCKET_NAME}\
		--profile ${PROFILE} \
		--region ${REGION}

get-s3-landing-url:
	@echo "Getting the landing URL..."
	$(eval LANDING_URL=$(shell aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='LandingURL'].OutputValue" --output text --profile ${PROFILE} --region ${REGION}))
	@echo "Landing URL: ${LANDING_URL}"

deploy-landing: get-s3-landing-url
	@echo "Uploading files to the S3 bucket..."
	aws s3 cp src/landing/index.html s3://${LANDING_BUCKET_NAME}/index.html --profile ${PROFILE} --region ${REGION}
	aws s3 cp src/landing/error.html s3://${LANDING_BUCKET_NAME}/error.html --profile ${PROFILE} --region ${REGION}

get-s3-blog-url:
	@echo "Getting the blog URL..."
	$(eval BLOG_URL=$(shell aws cloudformation describe-stacks --stack-name ${STACK_NAME} --query "Stacks[0].Outputs[?OutputKey=='BlogURL'].OutputValue" --output text --profile ${PROFILE} --region ${REGION}))
	@echo "Blog URL: ${BLOG_URL}"

deploy-blog: get-s3-blog-url
	@echo "Uploading files to the S3 bucket..."
	aws s3 cp src/blog/index.html s3://${BLOG_BUCKET_NAME}/index.html --profile ${PROFILE} --region ${REGION}
	aws s3 cp src/blog/error.html s3://${BLOG_BUCKET_NAME}/error.html --profile ${PROFILE} --region ${REGION}

deploy: deploy-landing deploy-blog

destroy:
	@echo "Deleting CloudFormation stack..."
	aws cloudformation delete-stack \
		--stack-name ${STACK_NAME} \
		--profile ${PROFILE} \
		--region ${REGION}
