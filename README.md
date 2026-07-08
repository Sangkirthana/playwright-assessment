## Installation

npm install

## Install Playwright:

npx playwright install

# Playwright Assessment for Web UI Automation

## Run UI Test

npx playwright test tests/webUI

## Generate Report

npx playwright show-report

# Playwright Assessment for API Automation


## Overview

This project demonstrates API automation testing using Playwright with TypeScript
The objective is to automate CRUD operations on the `/posts` endpoint from:
https://jsonplaceholder.typicode.com/
The test validates API responses, status codes, request/response payloads, and handles API behaviour limitations.

### API Behaviour Handling

JSONPlaceholder is a mock API and does not persist resources created through POST requests.  
The test handles this API limitation by capturing the behaviour and logging the reason instead of failing unexpectedly.
Therefore, the generated ID returned from the POST response may not be available for subsequent validation.

## Read
If the API supported persistence of newly created resources, the GET response would be validated against the original POST request payload to ensure:
- The title matches the created data
- The body matches the created data
- The userId matches the created data

## Update
If the API supported persistence of newly created resources, the PUT/PATCH response would be validated to ensure:
- The response status code indicates a successful update
- The updated fields contain the new values provided in the update request
- The unchanged fields remain consistent with the original data

## VERIFY UPDATE

If the API supported persistence of updates, a subsequent GET request would be performed to confirm:
- The updated fields contain the latest values
- The fields that were not modified remain unchanged

## DELETE
If the API supported persistence of resources, the DELETE response would be validated to ensure:
- The response status code indicates a successful deletion
- The API successfully processes the delete request
- The deleted resource ID is correctly used for the delete operation

## VERIFY DELETE
If the API supported persistence of deletion, a subsequent GET request would be performed to confirm:
- The deleted resource is no longer available
- The API returns `404` which means not found for the deleted resource