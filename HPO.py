import requests
import json
import re
import numpy as np

PARAMS = {
    'q': "HH",
}


t = "adadads dasfdf sd ASS45"
m = "Poly ADP-ribose BRCA polymerase-1 (PARP-1) inhibitors have been recognized as new agents for the treatment of patients with breast cancer type 1 (BRCA1) disorders. The quantitative structure-activity relationships (QSAR) technique was used in order to achieve the required medicines for anticancer activity easier and faster. In this study, the QSAR method was developed to predict the half-maximal inhibitory concentration (IC50) of 51 1H-benzo[d]immidazole-4-carboxamide derivatives by genetic algorithm-multiple linear regression (GA-MLR) and least squares-support vector machine (LS-SVM) methods. Results in the best QSAR model represented the coefficient of leave-one-out cross-validation (Qcv2) = 0.971, correlation coefficient (R2) = 0.977, Fisher parameter (F) = 259.016 and root mean square error (RMSE) = 0.095, respectively, which indicated that the LS-SVM model had a good potential to predict the pIC50 (9 - log(IC50 nM)) values compared with other modeling methods. Also, molecular docking evaluated interactions between ligands and enzyme and their free energy of binding were calculated and used as descriptors. Molecular docking and the QSAR study completed each other. The results represented that the final model can be useful to design some new inhibitors. So, the knowledge of the QSAR modeling and molecular docking was used in pIC50 prediction and 51 new compounds were developed as PARP-1 inhibitors that 9 compounds had the best-proposed values for pIC50. The maximum enhancement of the inhibitory activity of compounds was 33.394%."
j = np.unique(re.findall('[A-Z][A-Z]+[-]?[0-9]?', m))

count =  0

for gene in j:
    PARAMS = {
        'q': gene,
    }
    r = requests.get('http://hpo.jax.org/api/hpo/search/', params = PARAMS)
    try:
        id = (r.json()['genes'][0]['entrezGeneId'])
        r = requests.get('http://hpo.jax.org/api/hpo/gene/' + str(id), params = PARAMS)
        for disease['diseaseName'] in r.json()['diseaseAssoc']:
            if disease in abstract:
                count +=1
    except:
        pass

print(count)








# with open('HPO.json', 'w') as f:
#     json.dump(r.json(), f)