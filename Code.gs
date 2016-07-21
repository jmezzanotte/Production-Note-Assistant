/*
 * think of this part of the code as being server-side; it doesn't really know 
 * anything about the DOM. 
 * 
 */

function doGet() {
 
  // This function returns and html document 
  
  return HtmlService.createHtmlOutputFromFile('index')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME); 
}


function processForm( formObject ) { 
  
  /*
   * 
   * Below is a key list for the Object literal that contains all of the 
   * information from the form fields. Use these names to access the information 
   * from the form.
   * 
   * domain2, domain3, domain4, district
   * videoID, date1, date2, logistics
   * team, contactName, contactPhone, contactEmail
   * interviewee, leadershipChar,notes, dimension1
   * dimension2, dimension3, dimension4, domDimNotes1 
   * domDimNotes2, domDimNotes3, domDimNotes4,date1Notes, date2Notes
   *
   */ 
  
 
  var address_string  = formObject.address1 + "\n" + formObject.address2 + "\n" + formObject.city + ", " + formObject.state + " " +
                        formObject.zip;
  
  var contact = "Name: " + formObject.contactName + "\n Phone 1: " +  formObject.contactPhone1 + 
    "\n Phone 2: " + formObject.contactPhone2 + "\n Email: " + formObject.contactEmail;

  // Create a table of form data to be appended into the google doc
  var generalDataRows = [
                            ['District Name', formObject.district], 
                            ['Main Address', address_string ], 
                            ['District Contact', contact]
                        ];
   
  
   var shootDetailsRows = [
                              ['Video ID', formObject.videoID ], 
                              ['Video Title', formObject.videoTitle],
                              [ 'Shoot Date 1', formObject.date1 ], 
                              [ 'Shoot Date 1 Interviewees', formObject.interviewee1 ],
                              [ 'Shoot Date 1 Notes', formObject.date1Notes ], 
                              [ 'Shoot Date 2', formObject.date2 ], 
                              [ 'Shoot Date 2 Interviewees', formObject.interviewee2 ], 
                              [ 'Shoot Date 2 Notes', formObject.date2Notes ], 
                              [ 'Shoot Date 3', formObject.date3 ], 
                              [ 'Shoot Date 3 Interviewees', formObject.interviewee3 ], 
                              [ 'Shoot Date 3 Notes', formObject.date3Notes ], 
                              [ 'Production Team', formObject.team ], 
                              [ 'Logistics', formObject.logistics ]
                           ]; 
  
  
  
   var domainTableDataRows = [
                                [' ', 'Domain', 'Dimension', 'Notes' ],
                                ['1.',formObject.domain1, formObject.dimension1, 
                                      formObject.domDimNotes1 ], 
                                ['2.',formObject.domain2, formObject.dimension2, 
                                      formObject.domDimNotes2 ], 
                                ['3.', formObject.domain3, formObject.dimension3, 
                                      formObject.domDimNotes3 ], 
                                ['4.', formObject.domain4, formObject.dimension4, 
                                      formObject.domDimNotes4 ]
                            ];  
  
  
  var leaderDataRows = [
                           [ 'Attributes and Characteristics' ], 
                           [ formObject.leadershipChar ]
                       ];
  
  var notesTableDataRows = [
                               [ 'Additional Notes' ], 
                               [ formObject.notes  ]
                           ]; 
  
                               
 
  // Create a new google doc; use the district name 
  var doc = DocumentApp.create( formObject.district + ' ' + formObject.videoID +' ProductionNote');
  var body = doc.getBody(); 
  

  //Create the paragraph heading object
  var header1 = DocumentApp.ParagraphHeading.HEADING1; 
  var header2 = DocumentApp.ParagraphHeading.HEADING3; 
  
  // Create background color attribute
  var bgColor = '#484848';
  var fontColor = '#FFFFFF';
 
  // Hold your document heading in a separate variable
  var docHeadingString = 'Future Ready Leaders\nProduction Notes\n' + formObject.district;
  
  var documentHeading = doc.addHeader().appendParagraph( docHeadingString );
  documentHeading.setHeading( header2 );
  
  // Create the General header
  var generalHeader = body.appendParagraph('District Information'); 
  generalHeader.setHeading( header1 ); 
  
  // Insert the general information table under the general table
  generalTable = body.appendTable( generalDataRows ).setColumnWidth(0, 85);
  
  // Create Production Team Header 
  var productionTeamHeader = body.appendParagraph( 'Production Details' ); 
  productionTeamHeader.setHeading( header1 ); 
  
  // Insert the production team table 
  productionTeamTable = body.appendTable( shootDetailsRows ).setColumnWidth( 0, 85 ); 
  
  // Create domains and dimensions header 
  var domDimsHeader = body.appendParagraph('Domains and Dimensions');
  domDimsHeader.setHeading( header1 ); 
  
  // Insert the domains and dimenstion table under the header
  domainTable = body.appendTable( domainTableDataRows );
  domainTable.setColumnWidth(0, 25);
  domainTable.setColumnWidth(1, 80); 
  
  // Create the leadership header 
  var leadershipHeader = body.appendParagraph( 'District Leadership' ); 
  leadershipHeader.setHeading( header1 ); 
  
  // Insert the table under the header
  leaderTable = body.appendTable( leaderDataRows );
  
  // Create the notes header 
  var notesHeader = body.appendParagraph( 'Notes' ); 
  notesHeader.setHeading( header1 ); 
  
  notesTable = body.appendTable( notesTableDataRows ); 
 
  // Set color for leadership chars table
  leaderTable.getCell( 0 , 0 ).setBackgroundColor( bgColor ).setForegroundColor( fontColor ); 
  notesTable.getCell( 0, 0 ).setBackgroundColor( bgColor ).setForegroundColor( fontColor ); 

  for ( var i = 0; i < generalTable.getNumRows(); i++ ){
      generalTable.getCell( i, 0 ).setBackgroundColor( bgColor ).setForegroundColor( fontColor );
  }
  
  for ( var i = 0; i < productionTeamTable.getNumRows(); i++ ){
      productionTeamTable.getCell( i, 0 ).setBackgroundColor( bgColor ).setForegroundColor( fontColor );
  }
  
 
  for ( var i = 0; i < 4; i ++ ){ 
      domainTable.getCell(0, i).setBackgroundColor( bgColor ).setForegroundColor( fontColor );
  }
  
 
  return doc.getUrl();
  
}



