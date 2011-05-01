function(head, row, req, row_info) {
 	
	start({
	    "headers": {
	      "Content-Type": "text/html",
	     }
	  });

    var d = new Date();    
    var cur_ts = d.getTime();    
    var cur_locale_str = d.toLocaleString();

    var p = {}; // Hosts still present
    var l = {}; // Hosts that have probably left

    var pstr = "<p><h4> Hosts still present</h4></p>";
    var lstr = "<p><h4> Hosts that have probably left</h4></p>";

    var head = "============================== Learning Registry Node Presence ===================================";

    head += "<p> Unix time in milliseconds, at time of report run :" +  JSON.stringify(cur_ts) + "</p>";
    head += "<p> Which for human beings in the PST time zone is    :" +  cur_locale_str + "</p>";

	while (row = getRow()) {
	   	if(row.value.ts && row.value.ts > 0){	
		    var diff = cur_ts - row.value.ts;
		    var diff_in_sec = diff/1000.0;
		    var diff_in_min = diff_in_sec/60.0;
		    var diff_in_hr = diff_in_min/60.0;
            var k = row.key;

		   if (diff_in_min <= 5.0){
			    //p[k] = row.value.ts;
			    //mess below needs to be templatized in phase1
			    p[k] = "<li><p>Interval since last presence packet "+ 
		                   " --- ms: "+JSON.stringify(diff)+" --- secs: "+JSON.stringify(diff_in_sec)+" --- mins: "+JSON.stringify(diff_in_min)+
		                   " --- hrs: "+JSON.stringify(diff_in_hr)+"</p></li>";		
		   
		        if(k in l) { 
			      delete l[k]; // don't want host to appear in both present and left
			    } 
		   }
				
			else {
				//l[k] = row.value.ts;
                l[k] = "<li><p>Interval since last presence packet "+ 
			            " --- ms: "+JSON.stringify(diff)+" --- secs: "+JSON.stringify(diff_in_sec)+" --- mins: "+JSON.stringify(diff_in_min)+
			            " --- hrs: "+JSON.stringify(diff_in_hr)+"</p></li>";
		   }

		}
	}	
    
    for (var present in p){
	   pstr += "<p>" + present + ":" + p[present] + "</p>";  
    }

    for (var left in l){
	 lstr += "<p>" + left + ":" + l[left] + "</p>";  
    }

	var tail = "==========================================================================================";

	return head + "<p>" + pstr + "</p><p>" + lstr + "</p></ul>" + tail;	
	
}