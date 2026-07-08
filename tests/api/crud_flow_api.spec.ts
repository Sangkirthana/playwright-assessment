import { test, expect } from '@playwright/test';
import { ApiTestData } from '../../data/apiTestData';


test('CRUD flow for API', async ({ request }) => 

    
{
//CREATE - POST a new post with your own data    
const endpoint = 'https://jsonplaceholder.typicode.com/posts';
const createPostData = ApiTestData.createRequest;

    const createResponse = await request.post(endpoint, 
        {
            data: createPostData
        }
    );
        expect(createResponse.status()).toBe(201);
        const createResponseBody = await createResponse.json();
        expect(createResponseBody.id).toBeDefined();
        expect(createResponseBody.title).toBe(createPostData.title);
        expect(createResponseBody.body).toBe(createPostData.body);
        expect(createResponseBody.userId).toBe(createPostData.userId);
        const postId = createResponseBody.id;

        console.log("CREATE STATUS:", createResponse.status());
        console.log("CREATE BODY:", createResponseBody);

//read
    //READ - GET the post you just created using the id from step 1
    const readResponse = await request.get(`${endpoint}/${postId}`);
    const readStatus = readResponse.status();
        if (readStatus === 200) 
            {
                const readResponseBody = await readResponse.json();
                expect(readResponseBody.id).toBe(postId);
                expect(readResponseBody.title).toBe(createPostData.title);
                expect(readResponseBody.body).toBe(createPostData.body);
                expect(readResponseBody.userId).toBe(createPostData.userId);

                console.log("READ BODY:", readResponseBody);
            } 
        else if (readStatus === 404) 
            {
                //expect(readStatus).toBe(404);
                console.log("READ STATUS:", readStatus);
                console.log("JSONPlaceholder does not persist POST requests");
                console.log("The newly created ID not be available for Get validation");
                console.log("Therefore the response code is 404");
            }
        else 
            {
                throw new Error(`Unexpected READ response status: ${readStatus}`);
            }

            

//UPDATE - PUT the post to modify specific field(s)
    const updateData = ApiTestData.updateRequest;
    const updateResponse = await request.put(`${endpoint}/${postId}`,
        {
            data: updateData 
        }
    );
    const updateStatus = updateResponse.status();
        if (updateStatus === 200) {

            expect(updateStatus).toBe(200);
            const updateResponseBody = await updateResponse.json();
            expect(updateResponseBody.id).toBe(postId);
            expect(updateResponseBody.title).toBe(updateData.title); 
            expect(updateResponseBody.body).toBe(updateData.body);
            expect(updateResponseBody.userId).toBe(updateData.userId);
            console.log("UPDATE STATUS:", updateStatus);
            console.log("UPDATE BODY:", updateResponseBody);
        }
        else if (updateStatus === 500) {
            console.log("UPDATE STATUS:", updateStatus);
            console.log("Unable to update newly created post because JSONPlaceholder does not persist POST data.");
            console.log("POST returned a generated ID, but the resource was not persisted. ");
            console.log("Therefore the generated ID cannot be used for UPDATE.")
        }
        else {

            throw new Error(`Unexpected UPDATE response status: ${updateStatus}`);
        }

//VERIFY UPDATE - GET the post again to confirm changes were applied
    const verifyUpdateResponse = await request.get(`${endpoint}/${postId}`);
    const verifyUpdateStatus = verifyUpdateResponse.status();
        if (verifyUpdateStatus === 200) {

            expect(verifyUpdateStatus).toBe(200);
            const verifyUpdateResponseBody = await verifyUpdateResponse.json();   
            expect(verifyUpdateResponseBody.title).toBe(updateData.title); 
            expect(verifyUpdateResponseBody.body).toBe(updateData.body); 
            expect(verifyUpdateResponseBody.userId).toBe(updateData.userId); 
            console.log("UPDATE STATUS:", verifyUpdateStatus);
            console.log("UPDATE BODY:", verifyUpdateResponseBody);
        }
        else if (verifyUpdateStatus === 404) {
            expect(verifyUpdateStatus).toBe(404);
            console.log("GET UPDATE STATUS:", verifyUpdateStatus);
            console.log("JSONPlaceholder does not persist POST requests");
            console.log("The data has not updated");
            console.log("therefore when Post id = 101 is read no data found");

        }
        else {

            throw new Error(`Unexpected GET UPDATE response status: ${verifyUpdateStatus}`);
        }


//DELETE - DELETE the post using the same id
    const deleteResponse = await request.delete(`${endpoint}/${postId}`);
    const deleteStatus = deleteResponse.status();
        if (deleteStatus === 200) {
            console.log("DELETE STATUS:", deleteStatus);
            console.log("DELETE returned 200")
        }
        else {

                    throw new Error(`Unexpected DELETE response status: ${deleteStatus}`);
        }


//VERIFY DELETION - Try to GET the deleted post
    const finalGet = await request.get(`${endpoint}/${postId}`);
    const getStatusDelete = finalGet.status();
        if (getStatusDelete === 404) {
            console.log("DELETE STATUS:", getStatusDelete);
            console.log("GET returned 404 because the created resource was never persisted. ")
        }
        else 
                {

                    throw new Error(`Unexpected GET DELETE response status: ${getStatusDelete}`);
                }

});