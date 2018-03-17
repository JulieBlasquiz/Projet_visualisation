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

url = 'https://david.ncifcrf.gov/webservice/services/DAVIDWebService?wsdl'
    
print 'url=%s' % url

#
# create a service client using the wsdl.
#
client = Client(url)
client.wsdl.services[0].setlocation('https://david.ncifcrf.gov/webservice/services/DAVIDWebService.DAVIDWebServiceHttpSoap11Endpoint/')
#
# print the service (introspection)
#
#print client

#authenticate user email 
client.service.authenticate('julie.blasquiz@etu.u-bordeaux.fr')

#add a list 
fichier = open('listeIDuniprot.txt','r')
ListeID = fichier.read()
fichier.close()

inputIds = ListeID
idType = 'UNIPROT_ACCESSION'
listName = 'make_up'
listType = 0
print client.service.addList(inputIds, idType, listName, listType)

#print client.service.getDefaultCategoryNames()
categorySting = str(client.service.setCategories('GOTERM_BP_1,GOTERM_BP_2,GOTERM_BP_3,GOTERM_BP_4,GOTERM_BP_5,GOTERM_BP_ALL,GOTERM_BP_FAT,GOTERM_CC_1,GOTERM_CC_2,GOTERM_CC_3,GOTERM_CC_4,GOTERM_CC_5,GOTERM_CC_ALL,GOTERM_CC_FAT,GOTERM_MF_1,GOTERM_MF_2,GOTERM_MF_3,GOTERM_MF_4,GOTERM_MF_5,GOTERM_MF_ALL,GOTERM_MF_FAT'))

categories=categorySting.split(',')

tableReport = client.service.getTableReport()
tableRow = len(tableReport)
print 'Total table records:',tableRow

resF = 'list1.tableReport.txt'
with open(resF, 'w') as fOut:
	categoryConcat = '\t'.join(categories);
	fOut.write('ID\tGene Name\tSpecies\t'+categoryConcat)	
	for tableRecord in tableReport:
            name = tableRecord.name
            species = tableRecord.species
	    for arrayString in tableRecord.values:
		gene_id = ','.join(x for x in arrayString.array)
            rowList = [gene_id,name,species]
            fOut.write('\n'+'\t'.join(rowList))
	    for annotationRecord in tableRecord.annotationRecords:
	    	default_value = ''
		category_dict = dict.fromkeys(categories,default_value)			
		termsConcat = '';
		for term in annotationRecord.terms:
		    termString = term.split("$")[1]
		    termList = [termString,termsConcat]
		    termsConcat = ','.join(termList)		
		category_dict[str(annotationRecord.category)] = termsConcat;
		for key in category_dict:
    		    fOut.write('\t'+category_dict[key])		
   	print 'write file:', resF, 'finished!'
