import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, Image, Button, Keyboard, Alert, FlatList, Dimensions, TouchableOpacity } from 'react-native';

import { Food } from '../src/Food.js';
import FoodCard from '../assets/components/FoodCard.js';

// importing ingredients and restricions context
import IngredientsContext from '../context/ingredientsContext.js';
import RestrictionsContext from '../context/RestrictionsContext.js';


// OPENAI IMPORTS
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG_ID,
});
const openai = new OpenAIApi(configuration);

// Given a prompt and max # of tokens, returns a promise that becomes the string, containing the response to the prompt from OpenAI's API. 
// @ PARAMS prompt (string) and max number of tokens (number)
// @ RETURNs Promise => String containing the response from the AI
// On error: will return the error message
const response = async function (prompt, tokens) {
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 1.2,
            max_tokens: tokens,
        });
        return completion.data.choices[0].text;
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
        return `Error: ${error.message}. Please try again later`;
    }
}


// Given a prompt, will return a string that is the url to an image in response to the prompt
// NOTE: The image URL expires after 2 hours. 
// @ PARAMS input (string)
// @ RETURNs Promise => String containing the response from the AI
// On error: logs error to console.
const generateImage = async function (input) {
    try {
        const response = await openai.createImage({
            prompt: `${input}`,
            n: 1,
            size: "1024x1024",
        });
        return response.data.data[0].url;
    } catch (error) {
        console.log(error);
    }
}
// End of openAI API generations


// Generates a meal (an object containing a title, description, list of ingredients, list of instructions, and an image)
// @PARAMS: input (string of client input), ingredients (array), restrictions (array), prevFoods (array)
// @RETURN: meal object (see above comment for details)
const generateMeal = async function (input, ingredients, restrictions, prevFoods) {

    // Generating the title of the meal
    const titlePrompt = `You generate meal ideas based on user input. Respond with the title of a single meal. The user is told to input what they are feeling for dinner. This is what the user has in their fridge: ${ingredients.toString()} and these are the dietary restrictions that the user has: ${restrictions.toString()}. You do not have to generate meal ideas based on what is in the fridge. Give priority to the user input. This is their input: ${input}. However, any meal title that is created must not contain any of the dietary restrictions presented by the user. Return the title on a single line, not on multiple. Here are the previous foods, try not to repeat anything: ${prevFoods.toString()}. Feel free to generate meals that do not relate to what is in the fridge, but try to use things that are in the fridge.`;
    const testTitle = await response(titlePrompt, 50);

    // console.log(`Test title's value during generateMeal function: ${testTitle}`);



    // Generating the description
    const descriptionPrompt = `Generate a brief description for a meal based on its title. The description should be about a sentence, and should contain no extra words or titles. Title: ${testTitle}`

    const testDescription = await response(descriptionPrompt, 100);

    // generating the image 
    const img_url = await generateImage(`Title: ${testTitle} Description: ${testDescription}`);

    // generating the instructions
    const instructionsPrompt = `Generate instructions to cook a meal given the title of the meal and a description of the dish. The response should not contain a header, only the instructions (no no unncessary wording. Format the instructions as an ordered list.) Here is the title of the meal: ${testTitle} and here is a brief description: ${testDescription}. Your instructions must abide by the following dietary restrictions: ${restrictions.toString()}.`
    const testInstructions = await response(instructionsPrompt, 400);

    // generating the ingredients
    // as of right now not passing in restrictions. This may be something to consider in the future
    const ingredientsPrompt = `Generate a list of ingredients needed to create a meal given the title, description, and instructions of the meal. Title: ${testTitle}, Description: ${testDescription}, Instructions: ${testInstructions}. Include the items that are in the fridge. . The list should be formatted such as the following list (vertically, not containg bullets, not containing a header. No extra white space):
    Chicken Breast
    Rice
    Chicken Broth
    Broccoli
    
    The list should be no longer than 16 lines. If the list will be longer than 16 items, you may put multiple items on one line, seperated with commas, such as below:
    Chicken
    Rice
    ...
    Spices: oregano, paprika, etc.`
    const testIngredients = await response(ingredientsPrompt, 200);

    // 
    const meal = new Food(testTitle, testDescription, testInstructions, testIngredients, img_url);
    return meal;
};


const Maker = () => {
    const [input, setInput] = useState();
    const [foods, setFoods] = useState([]);
    const [doneLoading, setDoneLoading] = useState(true);

    const { ingredients } = useContext(IngredientsContext);
    const { restrictions } = useContext(RestrictionsContext);



    // Generates 5 meals and updates the useState variable (foods)
    // Takes the useState variable input (string) as the paramter for the generateMeal call. 
    async function addMeals() {
        const newMeals = [];
        for (let i = 0; i < 5; i++) {
            try {
                const meal = await generateMeal(input, ingredients, restrictions, foods);
                newMeals.push(meal);
                setFoods(newMeals);
            } catch (error) {
                setDoneLoading(true);
                const errorMessage = `That shit did NOT work. Here's why: ${error.message}`;
                Alert.alert(errorMessage);
            }
        }

    }

    // Handles the user's click. Calls the addMeals method and updates neccesary states
    // NOTE: wont do anything if its still loading, and wont do anything if input is blank
    async function handleClick() {
        if (input.length > 0 && doneLoading) {
            setDoneLoading(false);
            console.log("doneLoading before meal (should be true):" + doneLoading);
            Keyboard.dismiss();
            setInput("");
            setFoods([]);
            await addMeals();
            setDoneLoading(true);
            console.log("doneLoading after meal (should be true):" + doneLoading)
        }
    }

    return (

        <View style={styles.container}>

            {/* Input field */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.inputContainer}>
                <TextInput
                    placeholder="What are you feeling?"
                    style={styles.input}
                    value={input}
                    onChangeText={text => setInput(text)} />
                <TouchableOpacity style={styles.createButton} onPress={() => handleClick(input)}>
                    <Text style={styles.createText}>CREATE</Text>
                </TouchableOpacity>
            </ KeyboardAvoidingView >


            <FlatList
                horizontal={true}
                style={styles.cardContainer}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                data={foods}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <FoodCard
                        title={item.title}
                        description={item.description}
                        url={item.img_url}
                        instructions={item.instructions}
                        ingredients={item.ingredients}
                    />
                )}
                ListFooterComponent={() => (
                    doneLoading ? null : <FoodCard title={"\n\nGenerating..."} />
                )}
            />
        </View >
    );
}

export default Maker;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
    },
    createButton: {
        backgroundColor: "#65B600",
        borderRadius: 20,
        width: 80,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    createText: {
        color: 'white',
        fontWeight: 'bold',
    },
    inputContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#9c9086',
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: 250,
    },
    cardContainer: {
        paddingTop: 20,
        top: 50,
        paddingHorizontal: 20,
        backgroundColor: '#edf7ff',
    },
});