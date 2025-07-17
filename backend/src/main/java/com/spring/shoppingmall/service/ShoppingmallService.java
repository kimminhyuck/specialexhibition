package com.spring.shoppingmall.service;

import com.spring.shoppingmall.vo.ExhibitionDTO;
import com.spring.shoppingmall.vo.ProductGroupInfoVO;

import java.util.List;

public interface ShoppingmallService {

    List<ProductGroupInfoVO> getListExhibition();

    int registExhibition(ExhibitionDTO exhibitionDTO);
}
