function fixContains(a, b) {
    try {
        while ((b = b.parentNode)){
            if (b === a){
                return true;
            }
        }
        return false;
    } catch (e) {
        return false;
    }
}