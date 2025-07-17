package com.sprinng.shoppingmall.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ShoppingmallController {

    @RequestMapping("/list/exhibition")
    public Map<String, Object> getListExhibitionList() {
        Map<String, Object> resultMap = new HashMap<>();
        return resultMap;
    }
}
