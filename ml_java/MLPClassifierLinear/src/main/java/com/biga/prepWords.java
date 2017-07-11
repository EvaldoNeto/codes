package com.biga;

import org.datavec.api.util.ClassPathResource;
import org.deeplearning4j.berkeley.Pair;
import org.deeplearning4j.models.embeddings.loader.WordVectorSerializer;
import org.deeplearning4j.models.embeddings.inmemory.InMemoryLookupTable;
import org.deeplearning4j.models.word2vec.Word2Vec;
import org.deeplearning4j.text.sentenceiterator.BasicLineIterator;
import org.deeplearning4j.text.sentenceiterator.SentenceIterator;
//import org.deeplearning4j.text.sentenceiterator.UimaSentenceIterator;
import org.deeplearning4j.text.tokenization.tokenizer.preprocessor.CommonPreprocessor;
import org.deeplearning4j.text.tokenization.tokenizer.preprocessor.LowCasePreProcessor;
import org.deeplearning4j.text.tokenization.tokenizer.preprocessor.StringCleaning;
import org.deeplearning4j.text.tokenization.tokenizerfactory.DefaultTokenizerFactory;
import org.deeplearning4j.text.tokenization.tokenizerfactory.TokenizerFactory;
import org.deeplearning4j.text.tokenization.tokenizerfactory.NGramTokenizerFactory;
import org.deeplearning4j.ui.api.UIServer;
import org.deeplearning4j.plot.BarnesHutTsne;
import org.deeplearning4j.plot.Tsne.Builder;
import org.deeplearning4j.models.embeddings.WeightLookupTable;
//import org.deeplearning4j.models.word2vec.VocabWord;
import org.deeplearning4j.berkeley.Pair;
import org.deeplearning4j.models.word2vec.wordstore.VocabCache;
import org.deeplearning4j.models.word2vec.wordstore.inmemory.AbstractCache;
import org.deeplearning4j.models.word2vec.VocabWord;
import org.nd4j.linalg.api.buffer.DataBuffer;
import org.nd4j.linalg.api.buffer.util.DataTypeUtil;
import org.nd4j.linalg.api.ndarray.INDArray;
import org.nd4j.linalg.cpu.nativecpu.NDArray;
import org.nd4j.linalg.factory.Nd4j;
        
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileOutputStream;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Collection;

public class prepWords
{
    private static Logger log = LoggerFactory.getLogger(prepWords.class);
 
    public static void main(String[] args) throws Exception
    {
	String filePath = new ClassPathResource("raw_sentences.txt").getFile().getAbsolutePath();
	
	log.info("Load & Vectorize sentences...");

	SentenceIterator iter = new BasicLineIterator(filePath);

	//SentenceIterator iter = UimaSentenceIterator.createWithPath(filePath);

	//iter.setPreProcessor(new CommonPreprocessor());
	
	//while(iter.hasNext())
	//	System.out.println(iter.nextSentence());

	AbstractCache cache = new AbstractCache();
	int i = 0;

	//TokenizerFactory t = new NGramTokenizerFactory(new DefaultTokenizerFactory(), 1, 1);
	//t.setTokenPreProcessor(new CommonPreprocessor());

	//List<String> tokens = t.getTokens();
	//System.out.println(tokens);
	
	while(iter.hasNext())
	    {
		
		String mopa = new LowCasePreProcessor().preProcess(iter.nextSentence());
		String[] split = mopa.trim().replaceAll(" +", " ").split(" ");
		for(int j = 0; j < split.length; j++)
		    {
			if(cache.containsWord(split[j]))			    
			    cache.incrementWordCount(split[j]);							       
			else
			    {
				VocabWord words = new VocabWord(1.0, split[j]);
				cache.addToken(words);
			        cache.addWordToIndex(i, split[j]);
				i++;
				//System.out.println(split[j] + " " + i);				
			    }			       			       
		    }
	    }

	INDArray arr = Nd4j.create(4, 1);
	//INDArray arrS = Nd4j.create(new String[], new int[]{2,1});
	INDArray capi = Nd4j.create(new float[]{8}, new int[]{1,1});
	
	arr.putScalar(0, 2.0);
	arr.putScalar(1, 8.0);

	/*System.out.println(arr.getFloat(0, 0));
	System.out.println(arr.getFloat(1, 0));
	System.out.println(arr.getFloat(2, 0));
	System.out.println(arr.getFloat(3, 0));*/
	    
	int nWords = cache.numWords();
	int k = 0;
	PrintStream out = new PrintStream(new FileOutputStream("outFile.txt"));
	
	while(k < nWords)
	    {
		String wrd = cache.wordAtIndex(k);
		int wrdFreq = cache.wordFrequency(wrd);
		//out.println(wrdFreq + " " + wrd);
		k++;
	    }
	out.close();

	InMemoryLookupTable tbl = new InMemoryLookupTable();
	tbl.setVocab(cache);
	
	/*System.out.println(tbl.getVocab().words());
	System.out.println(tbl.getWeights());
	System.out.println(tbl.getSyn0());
	System.out.println(tbl.getSyn1());*/
	//File wordFile = new File("outfile.txt");
	//Pair<InMemoryLookupTable, VocabCache> pair = WordVectorSerializer.loadTxt(wordFile);
	
	// Two lines below separete the file in a word per line
	TokenizerFactory t = new DefaultTokenizerFactory();
	t.setTokenPreProcessor(new CommonPreprocessor());

	//System.out.println(t.nextToken());
	log.info("Building Model...");
	Word2Vec vec = new Word2Vec.Builder()
	    .minWordFrequency(5)
	    .iterations(5)
	    .layerSize(100)
	    .negativeSample(40)
	    .seed(42)
	    .windowSize(5)
	    .iterate(iter)
	    .tokenizerFactory(t)
	    .build();

	log.info("Fitting Word2Vec model...");
	vec.fit();

	VocabCache cache2 = vec.vocab();
	System.out.println(cache2.words());
	int n2 = cache2.numWords();
	int p = 0;
	while(p < n2)
	    {
		String temp = cache2.wordAtIndex(p);
		int f = cache2.wordFrequency(temp);
		System.out.println(temp + " " + f);
		p++;
	    }
	
	// Write word vectors
	WordVectorSerializer.writeWordVectors(vec, "pathToWriteto.txt");

	log.info("Closest words:");
	Collection<String> lst = vec.wordsNearest("day", 10);
	System.out.println(lst);

	double cosSim = vec.similarity("day", "night");
	System.out.println(cosSim);

	Collection<String> lst3 = vec.wordsNearest("man", 10);
	System.out.println(lst3);

	/*log.info("Plot TSNE");
	BarnesHutTsne tsne = new BarnesHutTsne.Builder()
	    .setMaxIter(1000)
	    .stopLyingIteration(250)
	    .learningRate(500)
	    .useAdaGrad(false)
	    .theta(0.5)
	    .setMomentum(0.5)
	    .normalize(true)      
	    .build();*/

	//File fl = new ClassPathResource("raw_sentences.txt").getFile();
	//System.out.println("Plotting TSNE...");
	//InMemoryLookupTable tbl = new InMemoryLookupTable();
	//tbl.plotVocab(tsne, 20, fl);
	//tsne.plot(vec.lookupTable, 2, vec.vocab(), outputFile);
	//System.out.println(cacheList);
    }
}
