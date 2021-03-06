package com.biga;

import org.nd4j.linalg.activations.Activation;
import org.nd4j.linalg.dataset.api.iterator.DataSetIterator;
import org.deeplearning4j.datasets.iterator.impl.MnistDataSetIterator;
import org.deeplearning4j.eval.Evaluation;
import org.deeplearning4j.nn.api.OptimizationAlgorithm;
import org.deeplearning4j.nn.conf.MultiLayerConfiguration;
import org.deeplearning4j.nn.conf.NeuralNetConfiguration;
import org.deeplearning4j.nn.conf.Updater;
import org.deeplearning4j.nn.conf.layers.DenseLayer;
import org.deeplearning4j.nn.conf.layers.OutputLayer;
import org.deeplearning4j.nn.multilayer.MultiLayerNetwork;
import org.deeplearning4j.nn.weights.WeightInit;
import org.deeplearning4j.optimize.listeners.ScoreIterationListener;
import org.nd4j.linalg.api.ndarray.INDArray;
import org.nd4j.linalg.dataset.DataSet;
import org.nd4j.linalg.lossfunctions.LossFunctions.LossFunction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MNIST2L
{
    private static Logger log = LoggerFactory.getLogger(MNIST2L.class);

    public static void main(String[] args) throws Exception
    {
	//number of rows and columns in the input pictures
	final int numRows = 28;
	final int numColumns = 28;
	int outputNum = 10; // number of output classes
	int batchSize = 64; // batch size for each epoch
	int rngSeed = 123; // random number seed for reproducibility
	int numEpochs = 15; // number of epochs to perform
	double rate = 0.0015;

	//Get the DataSetIterators
	DataSetIterator mnistTrain = new MnistDataSetIterator(batchSize, true, rngSeed);
	DataSetIterator mnistTest = new MnistDataSetIterator(batchSize, false, rngSeed);

	log.info("Build Model...");

	//building the nn
	MultiLayerConfiguration conf = new NeuralNetConfiguration.Builder()
	    .seed(rngSeed)
	    .optimizationAlgo(OptimizationAlgorithm.STOCHASTIC_GRADIENT_DESCENT)
	    .iterations(1)
	    .activation(Activation.RELU)
	    .weightInit(WeightInit.XAVIER)
	    .learningRate(rate) //specify the learning rate
	    .updater(Updater.NESTEROVS).momentum(0.98) //specify the rate of change of the learning rate
	    .regularization(true).l2(rate * 0.005)
	    .list()
	    .layer(0, new DenseLayer.Builder() //create the 1st input layer
		   .nIn(numRows * numColumns)
		   .nOut(500)
		   .build())
	    .layer(1, new DenseLayer.Builder() // create the 2nd input layer
		   .nIn(500)
		   .nOut(100)
		   .build())
	    .layer(2, new OutputLayer.Builder(LossFunction.NEGATIVELOGLIKELIHOOD) //create hidden layer
		   .nIn(100)
		   .nOut(outputNum)
		   .activation(Activation.SOFTMAX)
		   .build())
	    .pretrain(false).backprop(true)
	    .build();

	MultiLayerNetwork model = new MultiLayerNetwork(conf);
	model.init();
	// print the score with every 1 iteration
	model.setListeners(new ScoreIterationListener(1));

	log.info("Train Model...");
	
	for(int i = 0; i < numEpochs; i++)
	    {
		log.info("Epoch " + i);
		model.fit(mnistTrain);
	    }

	log.info("Evaluate Model...");
	Evaluation eval = new Evaluation(outputNum); // create an evaluation test with 10 possible classes
	while(mnistTest.hasNext())
	    {
		DataSet next = mnistTest.next();
		INDArray output = model.output(next.getFeatureMatrix()); // get the networks prediction
		eval.eval(next.getLabels(), output); // check the prediction against the true class
	    }
	log.info(eval.stats());
    }
}
