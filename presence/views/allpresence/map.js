function(doc) {		
//	  if(doc.ts && doc.ts != "" && doc.ts != 0)
	  if(doc.msg && doc.msg == "imhere")
	  {
		d = (new Date(doc.ts)).toLocaleString();
	    emit(doc.LRURL, {ts: doc.ts, date: d});
	  }
}