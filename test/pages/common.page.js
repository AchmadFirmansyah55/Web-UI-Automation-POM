const fs = require('fs');

class commonPage{
    constructor(driver){
        this.driver = driver;
    }

    async fullScreenshot(filename){
        const fullScreen = await this.driver.takeScreenshot();
        
        fs.writeFileSync(`screenshot/${filename}.PNG`,
            fullScreen,
            "base64"
        );
    }
    
    async elementScreenshot(element, filename){
        const elementScreen = await this.driver
        .findElement(element)
        .takeScreenshot();

        fs.writeFileSync(`screenshot/${filename}.PNG`,
            elementScreen,
            "base64"
        );
    }
}

module.exports = commonPage;