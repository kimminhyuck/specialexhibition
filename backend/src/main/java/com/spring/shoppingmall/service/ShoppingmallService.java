package com.spring.shoppingmall.service;

import com.spring.shoppingmall.vo.ExhibitionDTO;
import com.spring.shoppingmall.vo.ProductGroupInfoVO;
import com.spring.shoppingmall.vo.ProductInfoVO;
import com.spring.shoppingmall.vo.ProductPatternInfoVO;

import java.util.List;
import java.util.Map;

public interface ShoppingmallService {

    List<ProductGroupInfoVO> getListExhibition();

    int registExhibition(ExhibitionDTO exhibitionDTO);

    Map<String,Object> getListDetailExhibition(int exhibitionId);

    List<ProductInfoVO> getListProduct(int exhibitionId);

    int registExhibitionDetail(Map<String, Object> exhibitionDetails);
}
