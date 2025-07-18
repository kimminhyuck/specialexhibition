package com.spring.shoppingmall.vo;

import java.util.List;

public class PatternDTO {
    private int prdPtIdx;
    private int prdGrIdx;
    private String prdPtType;
    private String prdPtSort;
    private String prdPtView;
    private String crudType;

    public int getPrdPtIdx() {
        return prdPtIdx;
    }

    public void setPrdPtIdx(int prdPtIdx) {
        this.prdPtIdx = prdPtIdx;
    }

    public int getPrdGrIdx() {
        return prdGrIdx;
    }

    public void setPrdGrIdx(int prdGrIdx) {
        this.prdGrIdx = prdGrIdx;
    }

    public String getPrdPtType() {
        return prdPtType;
    }

    public void setPrdPtType(String prdPtType) {
        this.prdPtType = prdPtType;
    }

    public String getPrdPtSort() {
        return prdPtSort;
    }

    public void setPrdPtSort(String prdPtSort) {
        this.prdPtSort = prdPtSort;
    }

    public String getPrdPtView() {
        return prdPtView;
    }

    public void setPrdPtView(String prdPtView) {
        this.prdPtView = prdPtView;
    }

    public String getCrudType() {
        return crudType;
    }

    public void setCrudType(String crudType) {
        this.crudType = crudType;
    }

    @Override
    public String toString() {
        return "PatternDTO{" +
                "prdPtIdx=" + prdPtIdx +
                ", prdGrIdx=" + prdGrIdx +
                ", prdPtType='" + prdPtType + '\'' +
                ", prdPtSort='" + prdPtSort + '\'' +
                ", prdPtView='" + prdPtView + '\'' +
                ", crudType='" + crudType + '\'' +
                '}';
    }
}
