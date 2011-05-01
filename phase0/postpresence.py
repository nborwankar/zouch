import couchapi
import datetime, time, sys


debug = 1

hubhost = None
fromhost = None
dbname = None

hubhostfromargs = None
dbfromargs = None

#------------------- argument processing ------------

def usage():
	u = """
	Usage: python postpresence.py <fqdn for host to emulate> [ hubhost ] [interval]
	default hubhost is lr0.couchone.com
	"""
	return u

if len(sys.argv) > 1:
	fromhost = sys.argv[1]

else:
	print "must have a hostname to emulate"
	print usage()
	sys.exit(1)
	
if len(sys.argv) > 2:
	hubhostfromargs = sys.argv[2]

if len(sys.argv) > 3:
	dbfromargs = sys.argv[3]

#------------------- rest of code ---------------------
		    
hubhost = hubhostfromargs or 'localhost'
dbname = dbfromargs or 'wt0'

c = couchapi.Couch(hubhost, 5984)

doc_tmpl = """
{
 "LRURL": "%s",
 "ts": %d,
 "ts_human": "%s",
 "msg": "imhere"
}
"""

now_ts_ms = time.time()
now_ts = int(now_ts_ms*1000) # compute whole number of milliseconds since unix epoch
now_ts_human = time.ctime(now_ts_ms)

doc = doc_tmpl % (fromhost, now_ts, now_ts_human)

#docid = "imhere.%s" %(fromhost)

print doc

c.saveDoc(dbname, doc)


if debug:
	c.listDoc('wt0')


	
