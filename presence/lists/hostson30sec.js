function(head, row, req, row_info) {
 	
	start({
	    "headers": {
	      "Content-Type": "text/html",
	     }
	  });

    var cur_ts = (new Date()).getTime();
    
    var head = "============================== Learning Registry Node Presence ===================================";
    head += "<p>" + JSON.stringify(cur_ts) + "</p>";
    var present = "<p><h4> Hosts still present</h4></p><ul>";
    var left = "<p><h4> Hosts that have probably left</h4></p><ul>";

	while (row = getRow()) {
	   	if(row.value.ts && row.value.ts > 0){	
		    var diff = cur_ts - row.value.ts;
		    var diff_in_sec = diff/1000.0;
		    var diff_in_min = diff_in_sec/60.0;
		    var diff_in_hr = diff_in_min/60.0;
      
		   if (diff_in_sec <= 30.0){
		   		present += "<li> host: " +JSON.stringify(row.key)+ " <p>Interval since last presence packet "+ 
		                   " --- ms: "+JSON.stringify(diff)+" --- secs: "+JSON.stringify(diff_in_sec)+" --- mins: "+JSON.stringify(diff_in_min)+
		                   " --- hrs: "+JSON.stringify(diff_in_hr)+"</p></li>"; 
		   }
		   else {
			    left += "<li> host: " +JSON.stringify(row.key)+ " <p>Interval since last presence packet "+ 
			            " --- ms: "+JSON.stringify(diff)+" --- secs: "+JSON.stringify(diff_in_sec)+" --- mins: "+JSON.stringify(diff_in_min)+
			            " --- hrs: "+JSON.stringify(diff_in_hr)+"</p></li>";    
		   }

		}
	}	
	var tail = "==========================================================================================";
    
	return head + present + "</ul>" + left + "</ul>" + tail;
 
}