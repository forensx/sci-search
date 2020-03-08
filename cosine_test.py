import spacy

nlp = spacy.load("en_core_web_sm")


searchTerm = "BRCA1 missense mutations"
title1 = "Comprehensive Genomic Characterization of Breast Tumors with BRCA1 and BRCA2 Mutations"

title2 = "Replicated chromatin curtails 53BP1 recruitment in BRCA1-proficient and -deficient cells"

searchNLP = nlp(searchTerm)
title1NLP = nlp(title1)
title2NLP = nlp(title2)

print("Should be higher similar :", searchNLP.similarity(title1NLP))
print("Should not be similar:", searchNLP.similarity(title2NLP))