#import ssl
#ssl._create_default_https_context = ssl._create_unverified_context

import sys
sys.path.append('../')

import logging
import traceback as tb
import suds.metrics as metrics
from tests import *
from suds import *
from suds.client import Client
from datetime import datetime

errors = 0

setup_logging()

logging.getLogger('suds.client').setLevel(logging.DEBUG)

url = 'https://david-d.ncifcrf.gov/webservice/services/DAVIDWebService?wsdl'
    
print 'url=%s' % url

# create a service client using the wsdl.
client = Client(url)
client.wsdl.services[0].setlocation('https://david-d.ncifcrf.gov/webservice/services/DAVIDWebService.DAVIDWebServiceHttpSoap11Endpoint/')

#authenticate user email 
client.service.authenticate('reviewer@reviewer.org')

#add a list
fichier = open('listeIDuniprot1.txt','r')
ListeID = fichier.read()
fichier.close()

inputIds = ListeID
idType = 'UNIPROT_ACCESSION'
listName = 'make_up'
listType = 0

print client.service.addList(inputIds, idType, listName, listType)
print client.service.getDefaultCategoryNames()
