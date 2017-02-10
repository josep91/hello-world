/**
 * Enables Google Sheets integration for Lemonade Stand Point-of-Sale
 * Based on "JavaScript Quickstart", https://developers.google.com/sheets/api/quickstart/js
 * @author Joseph Nielson
 * @version 1.0 2017-2-1
 */


//Constants needed to access the Google Sheets API
var CLIENT_ID = '234987774387-h39chts8aro880r188duftnrdi03cmsr.apps.googleusercontent.com';
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

//Create variables for buttons: Sign in, create spreadsheet, move orders, and only export orders
var signInButton = $("#sign_in_button");
var createSpreadsheetButton = $("#create_spreadsheet_button");
var moveOrdersButton = $("#move_orders_button");
var onlyExportButton = $("#only_export_button");

/** 
 *On load, this function is called to load the auth2 library and API client library (Quickstart).
 */
function handleClientLoad()
{
	gapi.load('client:auth2', initClient);
}

//Initializes the API client library and sets up sign-in state listeners (Quickstart).
function initClient()
{
	gapi.client.init({
		discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
	}).then(function() 
	{
		//Listens for sign-in state changes
		gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
		
		//Handle the initial sign-in state
		updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
		signInButton.onclick = handleSignInClick;
		//...A sign out button is not being used
		//(Insert by Joseph) Sets up listener for other buttons
		createSpreadsheetButton.onclick = handleCreateSpreadsheet;
	});
}

//Called when the signed in status changes, to update the UI appropriately. After a sign-in, the API is called (Quickstart).
function updateSigninStatus(isSignedIn)
{
	if (isSignedIn)
	{
		signInButton.style.display = 'none';
		createSpreadsheetButton.style.display = 'block';
		moveOrdersButton.style.display = 'block';
		onlyExportButton.style.display = 'block';
		//TODO Add call to a function, like listMajors, that calls the API
		
		
	}
	else
	{
		signInButton.style.display = 'block';
		createSpreadsheetButton.style.display = 'none';
		moveOrdersButton.style.display = 'none';
		onlyExportButton.style.display = 'none';
	}
}

//Sign in the user upon button click (Quickstart).
function handleSignInClick(event)
{
	gapi.auth2.getAuthInstance().signIn();
}

//Sign out the user upon button click (Quickstart)

//Creates a new spreadsheet
function handleCreateSpreadsheet(event)
{
	//Create a spreadsheet
	var name = "Orders from Lemonade Stand Point-of-Sale";
	
	
}
