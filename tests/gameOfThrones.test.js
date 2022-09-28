const request = require('supertest');

const { expectedCharacter } = require('../data/jsonData.js');
const { expectedContinent } = require('../data/jsonData.js');
const { updateCharacter } = require('../data/jsonData.js');
const { invalidIdCharacter } = require('../data/jsonData.js');

const baseUrl = 'https://thronesapi.com/api/v2/';
const charactersEndpoint = 'Characters';
const continentsEndpoint = 'Continents';

describe("Tests with GET method", () => {

    it("should return valid character by ID and expected details", () => {
        return request(baseUrl)
            .get(charactersEndpoint + "/13")
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(expectedCharacter);
            });
    });

    it("should return error message for invalid character", () => {
        return request(baseUrl)
            .get(charactersEndpoint + "/555")
            .expect(400)
            .then(response => {
                expect(response.text).toContain("Invalid character id");
            });
    });

    it("should return a valid continent by ID and expected details", () => {
        return request(baseUrl)
            .get(continentsEndpoint + "/3")
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(expectedContinent)
            });
    });

    it("should return error message for invalid continent", () => {
        return request(baseUrl)
            .get(continentsEndpoint + "/5")
            .expect(400)
            .then(response => {
                expect(response.text).toContain("Invalid continent id");
            });
    });
});


describe("Tests with POST method", () => {

    it("should send a successful request to update a character", () => {
        return request(baseUrl)
            .post(charactersEndpoint)
            .send(updateCharacter)
            .expect(200)
            .then(response => {
                expect(response.text).toEqual("");
            });
    });

    it("should receive an error for a POST request with invalid ID", () => {
        return request(baseUrl)
            .post(charactersEndpoint)
            .send(invalidIdCharacter)
            .expect(400)
            .then(response => {
                expect(response.text).toContain("The JSON value could not be converted to System.Int32");
            });
    });

    it("should not allow POST requests to '/Continents' endpoint", () => {
        return request(baseUrl)
            .post(continentsEndpoint + "/5")
            .send(expectedContinent)
            .expect(405)
    });
});


describe("Tests with DELETE method", () => {

    it("should not allow DELETE requests to '/Characters' endpoint", () => {
        return request(baseUrl)
            .del(charactersEndpoint + "/25")
            .expect(405)
            .then(response => {
                expect(response.text).toEqual("The page you are looking for cannot be displayed because an invalid method (HTTP verb) is being used.");
            });
    });
});
