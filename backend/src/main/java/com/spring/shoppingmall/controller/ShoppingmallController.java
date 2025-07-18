package com.spring.shoppingmall.controller;

import com.spring.shoppingmall.service.ShoppingmallService;
import com.spring.shoppingmall.vo.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ShoppingmallController {

    @Autowired
    private ShoppingmallService shoppingmallService;

    //기획전 리스트 전체 출력
    @RequestMapping("/list/exhibition")
    public Map<String, Object> getListExhibitionList() {
        List<ProductGroupInfoVO> exhibitionList = shoppingmallService.getListExhibition();
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("exhibitionList", exhibitionList);
        return resultMap;
    }

    //기획전별 상세보기
    @RequestMapping("/list/detailExhibition")
    public Map<String, Object> getListDetailExhibition(@RequestParam int exhibitionId) {
        return shoppingmallService.getListDetailExhibition(exhibitionId);
    }

    //해당 기획전별 상품 전체목록 보기
    @RequestMapping("/list/product")
    public Map<String, Object> getListProduct(@RequestParam int exhibitionId) {
        List<ProductInfoVO> productList = shoppingmallService.getListProduct(exhibitionId);
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("productList", productList);
        return resultMap;
    }

    //기획전 등록
    @RequestMapping("/regist/exhibition")
    public Map<String, Object> registExhibition(@ModelAttribute ExhibitionDTO exhibitionDTO){
        System.out.println("기획전 정보 : " +exhibitionDTO.toString());
        int insertResult = shoppingmallService.registExhibition(exhibitionDTO);
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("insertResult", insertResult);
        return resultMap;
    }

    //기획전 상세 정보 등록(패턴, 상품 등록)
    @RequestMapping("/regist/exhibitionDetaii")
    public Map<String,Object> registExhibitionDetail(@ModelAttribute ExhibitionDetailDTO exhibitionDetailDTO){

        Map<String,Object> exhibitionDetails = new HashMap<>();
        exhibitionDetails.put("pattern", exhibitionDetailDTO.getPatternDTOList());
        exhibitionDetails.put("patternDetail", exhibitionDetailDTO.getPatternDetailDTOList());
        exhibitionDetails.put("product", exhibitionDetailDTO.getProductDTOList());

        int insertResult = shoppingmallService.registExhibitionDetail(exhibitionDetails);
        Map<String,Object> resultMap = new HashMap<>();
        resultMap.put("insertResult", insertResult);
        return resultMap;
    }

//    //패턴 등록
//    @RequestMapping("/regist/pattern")
//    public Map<String, Object> registPattern(){
//        Map<String, Object> resultMap = new HashMap<>();
//        return resultMap;
//    }
//
//    //상세 패턴 등록
//    @RequestMapping("/regist/detailPattern")
//    public Map<String, Object> registDetailPattern(){
//        Map<String, Object> resultMap = new HashMap<>();
//        return resultMap;
//    }
//
//    //상품 등록
//    @RequestMapping("/regist/product")
//    public Map<String, Object> registProduct(){
//        Map<String, Object> resultMap = new HashMap<>();
//        return resultMap;
//
//    }

//    //상세 패턴 삭제
//    @RequestMapping("/delete/detailPattern")
//    public Map<String, Object> deleteDetailPattern(){
//        Map<String, Object> resultMap = new HashMap<>();
//        return resultMap;
//    }
//
//    //패턴 삭제
//    @RequestMapping("/delete/pattern")
//    public Map<String, Object> deletePattern(){
//        Map<String, Object> resultMap = new HashMap<>();
//        return resultMap;
//    }
//
//    //상품 삭제
//    @RequestMapping("/delete/product")
//    public Map<String, Object> deleteProduct(){
//        Map<String, Object> resultMap = new HashMap<>();
//        return resultMap;
//    }

}
