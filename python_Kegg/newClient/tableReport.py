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

#print 'url=%s' % url

# create a service client using the wsdl.
client = Client(url)
client.wsdl.services[0].setlocation('https://david.ncifcrf.gov/webservice/services/DAVIDWebService.DAVIDWebServiceHttpSoap11Endpoint/')

#authenticate user email
client.service.authenticate('julie.blasquiz@etu.u-bordeaux.fr')

#add a list
liste_fichier_entree = ['listeIDuniprot1.txt','listeIDuniprot2.txt']
liste_fichier_sortie = ['list.tableReport1.txt','list.tableReport2.txt']

for i in range(len(liste_fichier_entree)):
    fichier = open(liste_fichier_entree[i],'r')
    ListeID = fichier.read()
    fichier.close()

    inputIds = ListeID
    idType = 'UNIPROT_ACCESSION'
    listName = 'make_up'
    listType = 0
    print client.service.addList(inputIds, idType, listName, listType)

    #print client.service.getDefaultCategoryNames()
    categorySting = str(client.service.setCategories('KEGG_PATHWAY'))
    categories=categorySting.split(',')

    tableReport = client.service.getTableReport()
    tableRow = len(tableReport)
    print 'Total table records:',tableRow

    with open(liste_fichier_sortie[i], 'w') as fOut:
	    liste_Annot = []
	    for tableRecord in tableReport:
                name = tableRecord.name
	        name = name.replace(",",";")
	        for arrayString in tableRecord.values:
		    gene_id = ','.join(x for x in arrayString.array)
	        for annotationRecord in tableRecord.annotationRecords:
	    	    default_value = ''
		    category_dict = dict.fromkeys(categories,default_value)
		    termsConcat = '';
		    for term in annotationRecord.terms:
		        termString = term.split(":")[1]
		        liste_Annot.append(termString)
		        liste_Annot = list(set(liste_Annot))
		    for annot in liste_Annot:
			    fOut.write(str(annot)+','+str(gene_id)+':'+str(name)+','+'\n')

	    print 'write file:', liste_fichier_sortie[i], 'finished!'
