package ee.tenman.flashcards.cucumber.stepdefs;

import ee.tenman.flashcards.FlashcardsApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = FlashcardsApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
